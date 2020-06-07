import $ from 'jquery';
import moment from 'moment';

class DomUpdates {
  constructor() {}
  
  displayAgentDashboard() {
    $('.login-page').addClass('hidden')
    $('.agent-dashboard').removeClass('hidden')
    $('.log-out-btn').removeClass('invisible')
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
    if (arr && divClass) {
      arr.forEach(trip => {
        $(divClass).prepend(` 
            <section class="trip-card">
            <p class="destination">${trip.destination}</p>
            <p class="dates">${trip.date} to ${moment().add(trip.duration, 'day').format('YYYY/MM/DD')}</p>
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

  incorrectLogin() {
    alert("Please Enter Correct Username and Password")
    $('.username-input').val('')
    $('.password-input').val('')
  }
}

export default DomUpdates; 