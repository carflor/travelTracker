import moment from 'moment';
class Agent {
  constructor(travelers, trips, destinations) {
    this.name = 'agent';
    this.allTravelers = travelers;
    this.allTrips = trips;
    this.allDestinations = destinations;
  }

  grabTripsForYear() {
    let yearAgo = moment().subtract(365, 'day').format("YYYY/MM/DD")
    let tomorrow = moment().add(1, 'day').format("YYYY/MM/DD")
    return this.allTrips.allTrips.reduce((acc, trip) => {
      let tripDate = trip.date
      if (moment(tripDate).isBetween(yearAgo, tomorrow)) {
        acc.push(trip)
      }
      return acc
    }, [])
  }

  calculateTotalYearIncome() {
    let yearTrips = this.grabTripsForYear()
    return yearTrips.reduce((acc, trip) => {
      acc += trip.flightCost * trip.travelers
      acc += trip.dailyLodging * trip.duration
      return acc
    }, 0)
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
    return this.allTrips.allTrips.reduce((acc, trip) => {
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