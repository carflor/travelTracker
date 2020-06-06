
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

import './css/base.scss';
import $ from 'jquery';
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
import Traveler from './Traveler';
import TravelerRepo from './TravelerRepo'
import Trip from './Trip';
import TripRepo from './TripRepo';
import Agent from './Agent';
import Destinations from './Destinations'
// import domUpdates from './domUpdates'

// Globals Variables

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
      console.log(dataSet.travelersData)
      console.log(dataSet.destinationsData)
      console.log(dataSet.tripsData)
      // send data to functions to instantiate! 
    })
    .catch(error => console.log(error.message))
}










// log in validation - translate to traveler 
// $('.submit-button').click(() => {
//   let username = $('.username-input')
//   let password = $('.password-input')
//   let customer = username.val().split('').splice(0, 8).join('')
//   let customerId = Number(username.val().split('').splice(8).join(''))

//   if ((customer === 'manager') && (password.val() === 'travel2020')) {
//     displayManagerDashboard()
//   } else if ((customer === 'traveler' && customerId) && (password.val() === 'travel2020')) {
//     displayCustomerDashboard(customerId)
//     loadCustomer(customerId, manager)
//   } else {
//     incorrectLogin()
//   }
// })


// INCORRECT LOGIN - do this or download the npm for alerts
// function incorrectLogin() {
//   alert("Please Enter Correct Username and Password")
//   $('.username-input').val('')
//   $('.password-input').val('')
// }

fetchApiData()