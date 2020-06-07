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
    console.log(pendingTrips, 'pending trips var')
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
            <p class="day-amount">${trip.duration}</p>
            <section class="card-bottom">
              <p class="group-size">Party Size:${trip.travelers}</p>
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

  incorrectLogin() {
    alert("Please Enter Correct Username and Password")
    $('.username-input').val('')
    $('.password-input').val('')
  }
}

export default DomUpdates; 