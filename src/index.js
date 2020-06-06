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
import Domupdates from './domUpdates';

let domUpdates = new DomUpdates()
let travelersRepo;
let destinationsRepo;
let tripsRepo;

// ApiFetch
const fetchApiData = () => {
  const api = new ApiFetch();
  const travelersData = api.getTravelers()
  const tripsData = api.getTrips()
  const destinationsData = api.getDestinations();
  
  Promise.all([travelersData, destinationsData, tripsData])
    .then(dataSet => dataSet = {
      travelersData: dataSet[0].travelers,
      destinationsData: dataSet[1].destinations, 
      tripsData: dataSet[2].trips.map(function(trip) {
        return {
          ...trip, 
          travelerName: dataSet[0].travelers.find(traveler => traveler.id === trip.userID).name,
          dailyLodging: dataSet[1].destinations.find(city => city.id === trip.destinationID).estimatedLodgingCostPerDay,
          flightCost: dataSet[1].destinations.find(city => city.id === trip.destinationID).estimatedFlightCostPerPerson
        } 
      })
      ,
    }).then(dataSet => {
      const allTravelers = dataSet.travelersData;
      const allTrips = dataSet.tripsData;
      const allDestinations = dataSet.destinationsData;
      start(allTravelers, allDestinations, allTrips)
    }).catch(error => console.log(error.message))
}

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
  let user = new Traveler(currentUser, trips)
  console.log(user, 'user instance in LOAD')
  domUpdates.displayUserDashboard()
  
}

function loadAgent() {
  let agent = new Agent(travelersRepo, tripsRepo, destinationsRepo)
  domUpdates.displayAgentDashboard()
  console.log(agent, 'AGENT IN LOAD')
}

// LOGOUT
$('.log-out-btn').click(() => location.reload(true))

// EventHandler for Book Trip Form
// const eventHandler = (event) => {
//   if (event.target.classList.contains('')) {
//    
//   } else if (event.target.classList.contains('')) {
//     
// }

fetchApiData();