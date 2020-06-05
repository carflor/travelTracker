
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

import './css/base.scss';
import $ from 'jquery';
import moment from 'moment';
// const today = moment().format("YYYY/MM/DD").split('-').join('/')

// IMPORT ALL CLASSES BELOW
import ApiFetch from './ApiFetch';
import Traveler from './Traveler';
import Trip from './Trip';
import TripRepo from './TripRepo';
import Agent from './Agent';
import Destinations from './Destinations'
// import domUpdates from './domUpdates'

// Globals Variables
const api = new ApiFetch();

// ApiFetch
const fetchApiData = () => {
  const travelersData = api.getTravelers()
  const tripsData = api.getTrips()
  const destinationsData = api.getDestinations();
  
  Promise.all([travelersData, tripsData, destinationsData])
    .then(dataSet => dataSet = {
      travelersData: dataSet[0].travelers,
      tripsData: dataSet[1].trips.map(function(trip) {
        return {
          ...trip, 
          travelerName: dataSet[0].travelers.find(traveler => traveler.id === trip.userID).name
        } 
      })
      ,
      destinationsData: dataSet[2].destinations, 
    }).then(dataSet => {
      console.log(dataSet.travelersData)
      console.log(dataSet.tripsData)
      console.log(dataSet.destinationsData)
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