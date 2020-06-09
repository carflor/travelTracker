import moment from 'moment';
class Agent {
  constructor(travelers, trips, destinations) {
    this.name = 'agent';
    this.allTravelers = travelers;
    this.allTrips = trips;
    this.allDestinations = destinations;
    this.yearsTrips = this.grabTripsForYear();
  }

  getAllPendingTrips() {
    let result = []
    this.allTrips.forEach(trip => {
      if (trip.status === 'pending') {
        result.push(trip)
      }
    })
    return result
  }

  grabTripsForYear() {
    let yearAgo = moment("2020/01/01").format("YYYY/MM/DD")
    let tomorrow = moment().add(1, 'day').format("YYYY/MM/DD")
    return this.allTrips.reduce((acc, trip) => {
      let tripDate = trip.date
      if (moment(tripDate).isBetween(yearAgo, tomorrow)) {
        acc.push(trip)
      }
      return acc
    }, [])
  }

  calculateTotalYearIncome() {
    let yearTrips = this.grabTripsForYear()
    let tripsIncome = yearTrips.reduce((acc, trip) => {
      let flights = trip.flightCost * trip.travelers
      let lodgings = trip.dailyLodging * trip.duration
      let total = (flights + lodgings) * .1
      return acc += total
    }, 0)
    return +tripsIncome.toFixed(2)
  }

  searchByUserName(str) {
    const filteredUsers = [];
    if (!str) {
      return this.allTravelers.allTravelers
    }
    this.allTravelers.allTravelers.forEach(traveler => {
      let travelerName = traveler.name.toLowerCase();
      if (travelerName.includes(str) && !filteredUsers.includes(traveler)) {
        filteredUsers.push(traveler)
      }
    })
    return filteredUsers
  }

  getAllUsersOnTrips() {
    return this.allTrips.reduce((acc, trip) => {
      let tripDate = trip.date
      let finishDate = moment(trip.date).add(trip.duration, 'day').format('YYYY/MM/DD')
      if (moment().isBetween(tripDate, finishDate)) {
        acc.push(trip)
      }
      return acc
    }, [])
  }
}

export default Agent;