import $ from 'jquery';
import moment from 'moment';
import Traveler from './Traveler'

class DomUpdates {
  constructor() {}
  
  displayAgentDashboard(agent) {
    $('.login-page').addClass('hidden')
    $('.agent-dashboard').removeClass('hidden')
    $('.log-out-btn').removeClass('invisible')
    $('.agency-income').html(`Agency Revenue Year 2020: $${agent.calculateTotalYearIncome()}`)
    this.displayPendingTripsAgent(agent)
    this.displayCurrentlyTraveling(agent)
    this.displayAllUsers(agent)
  }

  displayAllUsers(agent) {
    agent.allTravelers.allTravelers.forEach(traveler => {
      $('.all-travelers-container').prepend(`
      <section class="user-card">
        <p class="user-name">${traveler.name}</p>
        <button class="all-details">View Details</button>
      </section>
      `)
    })
  }

  displaySearchedUsers(searchResults) {
    searchResults.forEach(traveler => {
      $('.all-travelers-container').prepend(`
      <section class="user-card">
        <p class="user-name">${traveler.name}</p>
        <button class="all-details">View Details</button>
      </section>
      `)
    })
  }

  displayCurrentlyTraveling(agent) {
    agent.getAllUsersOnTrips().forEach(traveler => {
      $('.traveling-now-container').prepend(`
      <section class="current-traveler-cards">
        <p class="traveler-name">${traveler.travelerName.name}</p>
        <p class="traveler-location">${traveler.destination}</p>
        <p class="crew-size">Party Size: ${traveler.travelers}</p>
      </section>
      `)
    })
  }

  // DUPLICATES ISSUE ON THIS FN?!?
  displayPendingTripsAgent(agent) {
    agent.getAllPendingTrips().forEach(trip => {
      $('.pending-trip-container').prepend(`
      <section class="pending-cards">
        <p class="trip-id">Locator # ${trip.id}</p>
        <p class="user-name-trip">Traveler: ${trip.travelerName.name}</p>
        <p class="user-trip-location">Destination: ${trip.destination}</p>
        <p class="departure-date">Departure Date: ${trip.date}</p>
        <p class="trip-duration">Duration: ${trip.duration} days</p>
        <p class="group-size">Group Size: ${trip.travelers}</p>
        <p class="current-status">Status: ${trip.status}</p>
        <section class="btn-box"> 
          <button class='cancel-trip'>CANCEL</button>
          <button class='approve-trip'>APPROVE</button>
        </section>
      </section>`)
    })
  }
  
  displayUserDashboard(user) {
    $('.login-page').addClass('hidden')
    $('.user-dashboard').removeClass('hidden')
    $('.log-out-btn').removeClass('invisible')
    $('.welcome-message').html(`${user.name.split(' ')[0]} Dashboard`)
    $('.travel-points').html(`Total Travel Points: ${user.getAmountSpentThisYear()}`)
    const pendingTrips = user.getPendingTrips()
    if (pendingTrips.length === 0) {
      $('.trips-box').html(`<p class='default-message'>No current travel plans<br> Please make a booking to accumulate Travel Points!<p>`)
    } else {
      this.displayTripCards(pendingTrips, '.trips-box')
    }
  }
  
  displayTripCards(arr, divClass) {
    // I ADDED TRIP.DATE TO LINE 92 to see if it fixes data error on display
    if (arr && divClass) {
      arr.forEach(trip => {
        $(divClass).prepend(` 
          <section class="trip-card">
            <p class="destination">${trip.destination}</p>
            <p class="dates">${trip.date} to ${moment(trip.date).add(trip.duration, 'day').format('YYYY/MM/DD')}</p>
            <p class="day-amount">Duration: ${trip.duration} days</p>
            <section class="card-bottom">
              <p class="group-size">Party Size: ${trip.travelers}</p>
              <p class="status">${trip.status.toUpperCase()}</p>
            </section>
          </section>`
        )
      })
    }
  }

  displayUserDestinations(destinations, divClass) {
    if (destinations && divClass) {
      destinations.forEach(destination => {
        $(divClass).append(`<section class="location-card" tabindex='0'>
            <p class="location-name">${destination.destination}</p>
            <img class="location-img" src=${destination.image} alt=${destination.alt} />
            <section class="location-card-bottom">
              <p class="flight-cost">Flight Cost: $${destination.estimatedFlightCostPerPerson}</p>
              <p class="lodging-cost">Daily Lodging Cost: $${destination.estimatedLodgingCostPerDay}</p>
              <button class="calculate-estimate">BOOK</button>
            </section>
          </section>
        `)
      })
    }
  }

  displayUserHistoryDetails(event, agent) {
    const clickedUserName = $(event.target).closest('.user-card').find('.user-name').html()
    const userData = agent.allTravelers.allTravelers.find(traveler => traveler.name === clickedUserName)
    const foundUser = new Traveler(userData, agent.allTrips)
    console.log(foundUser, 'instantiation')
    $('.user-name-title').html(`${foundUser.name}`)
    $('.user-traveling-costs').html(`Year Investment: $${foundUser.getAmountSpentThisYear()}`)
    this.displayUserUpcomingTrips(foundUser)
    this.displayUserFullTripHistory(foundUser)
  }

  displayUserFullTripHistory(user) {
    let usersHistory = user.tripHistory.filter(trip => trip.userID === user.id)
    usersHistory.forEach(trip => {
      $('.insert-history-trips').prepend(`
        <section class="history-trip-card">
          <p class="future-location">${trip.destination}</p>
          <p class="future-date">${trip.date}</p>
          <p class="history-duration">${trip.duration}</p>
          <p class="history-group-size">${trip.travelers}</p>
          <p class="confirmation-num">${trip.id}</p>
        </section>
      `)
    })
  }

  displayUserUpcomingTrips(user) {
    let usersFuture = user.futureTrips.filter(trip => trip.userID === user.id)
    usersFuture.forEach(trip => {
      $('.insert-future-trips').prepend(`
        <section class="future-trip-card">
          <section class="future-data-box">
            <p class="future-location">${trip.destination}</p>
            <p class="future-date">${trip.date}</p>
            <p class="confirmation-num">${trip.id}</p>
          </section>
          <button class="cancel-future-btn">CANCEL</button>
        </section>
      `)
    })
  } 

  displayTravelHistory() {
    $('.travel-history-container').removeClass('hidden')
    $('.new-trip-container').addClass('hidden')
    $('.trips-box').html('');
  }

  displayDestinationsSearch() {
    $('.travel-history-container').addClass('hidden')
    $('.new-trip-container').removeClass('hidden')
  }

  displayBookingPage(event) {
    let name = $(event.target).closest('.location-card').children().html()
    $('.form-title').html(name)
    $('.book-form').removeClass('hidden')
    $('.traveler-details-box').addClass('blur')
    $('.new-trip-container').addClass('blur')
  }

  displayConfirmationPage(event, allDestinations) {
    // validate that all inputs are filled in
    // validate that depart date is tomorrow at earliest
    // fix issue with partySize where it does not auto get value of 1 placeholder!
    event.preventDefault()
    const locationName = $(event.target).closest('.process-booking').children().html()
    const startDate = $(event.target).closest('.process-booking').find('#start-date').val()
    const formatStartDate = moment(startDate).format("YYYY/MM/DD")
    const endDate = $(event.target).closest('.process-booking').find('#return-date').val()
    const formatEndDate = moment(endDate).format("YYYY/MM/DD")
    const partySize = $(event.target).closest('.process-booking').find('#party-size').val()
    const cityObj = allDestinations.destinations.find(city => city.destination === locationName) 
    const beginDate = moment(startDate)
    const finalDate = moment(endDate)
    const dayAmount = finalDate.diff(beginDate, 'days', false)
    const totalCost = allDestinations.getDestinationCost(cityObj, partySize, dayAmount)
    $('.total-cost').html(`Approximate Total Cost: $${totalCost}`)
    $('.confirm-location').html(`DESTINATION: ${locationName}`) 
    $('.confirm-start-date').html(`DEPARTURE DATE: ${formatStartDate}`)
    $('.confirm-return-date').html(`RETURN DATE: ${formatEndDate}`)
    $('.confirm-party-size').html(`Number of Travelers: ${partySize}`)
    $('.book-form').addClass('hidden')
    $('.confirm-trip').removeClass('hidden')
  }

  finishUserConfirmation() {
    $('.confirm-trip').addClass('hidden')
    $('.traveler-details-box').removeClass('blur')
    $('.new-trip-container').removeClass('blur')
  }

  incorrectLogin() {
    alert("Please Enter Correct Username and Password")
    $('.username-input').val('')
    $('.password-input').val('')
  }
}

export default DomUpdates; 