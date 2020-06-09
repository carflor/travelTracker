import $ from "jquery";
import './css/base.scss';
import moment from 'moment';

// DATE CHECKS
const today = moment().format("YYYY/MM/DD")
console.log(today, 'today')
const tomorrow = moment().add(1, 'day').format("YYYY/MM/DD")
console.log(tomorrow, 'tomorrow')
const yearAgo = moment().subtract(365, 'day').format("YYYY/MM/DD")
console.log(yearAgo, 'yearAgo')
const future = moment().isAfter(today)
console.log(future, 'future')
let duringYear = moment().isBetween(yearAgo, tomorrow);
console.log(duringYear, 'during year check')

// IMPORT ALL CLASSES BELOW
import ApiFetch from './ApiFetch';
import TravelerRepo from './TravelerRepo'
import TripRepo from './TripRepo';
import Destinations from './Destinations'
import DomUpdates from './domUpdates';
import Traveler from './Traveler';
import Agent from './Agent';
import Trip from './Trip';

let domUpdates = new DomUpdates()
let travelersRepo;
let destinationsRepo;
let tripsRepo;
let user;
let agent;

// ApiFetch
const fetchApiData = () => {
  const api = new ApiFetch();
  const travelersData = api.getTravelers()
  const tripsData = api.getTrips()
  const destinationsData = api.getDestinations();
  
  Promise.all([travelersData, destinationsData, tripsData])
  .then(dataSet => dataSet = {
    // why is line 48 not like .name chained to it !?!?!?!?!?!?
    travelersData: dataSet[0].travelers,
    destinationsData: dataSet[1].destinations, 
    // tripsData: (dataSet) => fixData(dataSet)
    tripsData: dataSet[2].trips.map(function(trip) {
      return {
        ...trip, 
        travelerName: dataSet[0].travelers.find(traveler => traveler.id === trip.userID),
        dailyLodging: dataSet[1].destinations.find(city => city.id === trip.destinationID).estimatedLodgingCostPerDay,
        flightCost: dataSet[1].destinations.find(city => city.id === trip.destinationID).estimatedFlightCostPerPerson,
        destination: dataSet[1].destinations.find(city => city.id === trip.destinationID).destination,
      } 
    })
  }).then(dataSet => {
    let allTravelers = dataSet.travelersData
    let allDestinations = dataSet.destinationsData
    let allTrips = dataSet.tripsData
    start(allTravelers, allDestinations, allTrips)
  }).catch(error => console.log(error.message))
}

// function fixData(dataSet) {
//   dataSet[2].trips.map(function(trip) {
//     return {
//       ...trip, 
//       travelerName: dataSet[0].travelers.find(traveler => traveler.id === trip.userID),
//       dailyLodging: dataSet[1].destinations.find(city => city.id === trip.destinationID).estimatedLodgingCostPerDay,
//       flightCost: dataSet[1].destinations.find(city => city.id === trip.destinationID).estimatedFlightCostPerPerson,
//       destination: dataSet[1].destinations.find(city => city.id === trip.destinationID).destination,
//     } 
//   })
// }

// APP START - instantiations
function start(travelersData, destinationsData, tripsData) {
  travelersRepo = new TravelerRepo(travelersData)
  destinationsRepo = new Destinations(destinationsData)
  tripsRepo = new TripRepo(tripsData)
}

// Log In validation
$('.submit-button').click(() => {
  let username = $('.username-input').val()
  let password = $('.password-input').val();
  let traveler = username.split('').splice(0, 8).join('')
  let travelerId = Number(username.split('').splice(8).join(''))

  if (username === 'agent' && password === 'travel2020') {
    loadAgent()
  } else if ((traveler === 'traveler' && travelerId) && (password === 'travel2020')) {
    loadTraveler(travelerId)
  } else {
    domUpdates.incorrectLogin()
  }
})

function loadTraveler(id) {
  let trips = tripsRepo.dataPerUser
  let currentUser = travelersRepo.getTravelerById(id)
  user = new Traveler(currentUser, trips[id.toString()])
  domUpdates.displayUserDashboard(user)
  console.log(user, 'user instance in LOAD')
}

function loadAgent() {
  agent = new Agent(travelersRepo, tripsRepo.allTrips, destinationsRepo)
  domUpdates.displayAgentDashboard(agent)
}

// EVENT HANDLERS
$('.log-out-btn').click(() => location.reload(true))
$('.user-dashboard').click((event) => userBtnHandler(event))
$('.agent-dashboard').click((event) => agentBtnHandler(event))

const userBtnHandler = (event) => {
  if (event.target.classList.contains('current-trips')) {
    $('.trips-box').html('')
    domUpdates.displayTripCards(user.getPendingTrips(), '.trips-box')
  } else if (event.target.classList.contains('past-trips')) {
    $('.trips-box').html('')
    domUpdates.displayTripCards(user.getPastTrips(), '.trips-box')
  } else if (event.target.classList.contains('upcoming-trips')) {
    $('.trips-box').html('')
    domUpdates.displayTripCards(user.getFutureTrips(), '.trips-box')
  } else if (event.target.classList.contains('all-trips')) {
    $('.trips-box').html('');
    domUpdates.displayTripCards(user.yearsTrips, '.trips-box')
  } else if (event.target.classList.contains('history-button')) {
    domUpdates.displayTravelHistory()
    domUpdates.displayTripCards(user.yearsTrips, '.trips-box')
  } else if (event.target.classList.contains('plan-new-trip')) {
    domUpdates.displayDestinationsSearch()
    domUpdates.displayUserDestinations(destinationsRepo.destinations, '.location-container')
  } else if (event.target.classList.contains('calculate-estimate')) {
    domUpdates.displayBookingPage(event)
    // insert date value here for tomorrow as earliest travel plan
  } else if (event.target.classList.contains('form-back-btn')) {
    event.preventDefault()
    $('.book-form').addClass('hidden')
    $('.traveler-details-box').removeClass('blur')
    $('.new-trip-container').removeClass('blur')
  } else if (event.target.classList.contains('book-this-trip')) {
    domUpdates.displayConfirmationPage(event, destinationsRepo)
  } else if (event.target.classList.contains('confirm-back-btn')) {
    $('.confirm-trip').addClass('hidden')
    $('.book-form').removeClass('hidden')
  } else if (event.target.classList.contains('confirm-this-trip')) {


    // triggers POST for trip to be pending
    // NEEDS TO UPDATE DATA ON USER PAGE AFTER POST
    userPost(event, user, destinationsRepo)
    domUpdates.finishUserConfirmation()
    domUpdates.displayUserDashboard(user)
  }
}

const agentBtnHandler = (event) => {
  if (event.target.classList.contains('all-details')) {
    $('.show-user-full-history').removeClass('hidden')
    $('.agent-nav').addClass('blur')
    $('.agent-data-container').addClass('blur')
    domUpdates.displayUserHistoryDetails(event, agent)

    // if flights are in future - place a CANCEL button on them// !!!! 


  } else if (event.target.classList.contains('history-back-btn')) {
    $('.show-user-full-history').addClass('hidden')
    $('.agent-nav').removeClass('blur')
    $('.agent-data-container').removeClass('blur')
  } else if (event.target.classList.contains('cancel-trip')) {


    // triggers fn for POST CANCELLED 
  } else if (event.target.classList.contains('approve-trip')) {


    // triggers fn for POST APPROVE
  }
}

// SEARCH FUNCTION
$('#search').on('keyup', function searchPlaces(event) {
  const searchValue = event.target.value.toLowerCase();
  $('.location-container').html('')
  let searchResults = searchDestinations(searchValue)
  let results = []
  searchResults.forEach(city => {
    results.push(city)
  })
  domUpdates.displayUserDestinations(results, '.location-container')
})

function searchDestinations(str) {
  if (str) {
    const filteredCities = [];
    destinationsRepo.destinations.forEach(destination => {
      let destinationName = destination.destination.toLowerCase();
      if ((destinationName.includes(str) && !filteredCities.includes(destination))) {
        filteredCities.push(destination)
      }
    }) 
    return filteredCities;
  }
}

$('#search-users').on('keyup', function searchUsers(event) {
  const searchValue = event.target.value.toLowerCase();
  if (searchValue != '') {
    $('.all-travelers-container').html('')
    let searchResults = agent.searchByUserName(searchValue)
    let results = []
    searchResults.forEach(user => {
      results.push(user)
    })
    domUpdates.displaySearchedUsers(results)
  } 
  if (!searchValue) {
    domUpdates.displayAllUsers(agent)
  }
})

//USER POST
function userPost() {
  const userId = user.id
  const destination = $(event.target).closest('.confirmation-container').find('.confirm-location').html()
  const formatDestination = destination.split(': ')[1]
  const destinationMatch = destinationsRepo.destinations.filter(destination => destination.destination === formatDestination)
  const destinationId = destinationMatch[0].id
  const groupSize = $(event.target).closest('.confirmation-container').find('.confirm-party-size').html()
  const formatGroupSize = +groupSize.split(': ')[1]
  const travelDate = $(event.target).closest('.confirmation-container').find('.confirm-start-date').html()
  const formatTravelDate = travelDate.split(': ')[1]
  console.log(formatTravelDate, 'formatted date')
  const returnDate = $(event.target).closest('.confirmation-container').find('.confirm-return-date').html()
  const formatReturnDate = returnDate.split(': ')[1]
  const momentReturn = moment(formatReturnDate)
  const momentDepart = moment(formatTravelDate)
  const dayAmount = momentReturn.diff(momentDepart, 'days')

  if (dayAmount) {
    let travelObj = {
      "userID": userId,
      "destinationID": destinationId,
      "travelers": formatGroupSize,
      "date": formatTravelDate,
      "duration": dayAmount,
      "status": "pending",
      "suggestedActivities": []
    }

    const travelRequest = new Trip(travelObj)
    const api = new ApiFetch();

    api.postTripRequest(travelRequest)
      .then(travelRequest => tripsRepo.allTrips.push(travelRequest))
      .then(() => domUpdates.displayUserDashboard(user))
      .catch(err => console.log(err))
    }
}


fetchApiData();