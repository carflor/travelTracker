import moment from 'moment';
class Traveler {
  constructor(user, allTrips) {
    this.id = user.id;
    this.name = user.name;
    this.travelerType = user.travelerType;
    this.tripHistory = allTrips.dataPerUser[this.id.toString()]
    this.yearsTrips = this.getTripsThisYear()
    this.futureTrips = this.getFutureTrips()
  }
  
  // method for show upcoming trips
  // add display on dom functionality
  getFutureTrips() {
    let today = moment().format("YYYY/MM/DD")
    return this.tripHistory.reduce((acc, trip) => {
      let tripDate = trip.date
      if (!moment(tripDate).isBefore(today) && trip.status === 'approved') {
        acc.push(trip)
      }
      return acc
    }, [])
  }

  // method for calculating pending trips
  // add domdisplay fn for this method
  getPendingTrips() {
    return this.tripHistory.filter(trip => trip.status === 'pending')
  }

  //add dom display fn for this method
  getTripsThisYear() {
    let yearAgo = moment().subtract(365, 'day').format("YYYY/MM/DD")
    let tomorrow = moment().add(1, 'day').format("YYYY/MM/DD")
    return this.tripHistory.reduce((acc, trip) => {
      let tripDate = trip.date
      if (moment(tripDate).isBetween(yearAgo, tomorrow)) {
        acc.push(trip)
      }
      return acc
    }, [])
  }

  //add dom display fn for this method
  getAmountSpentThisYear() {
    return this.yearsTrips.reduce((acc, trip) => {
      acc += trip.duration * trip.dailyLodging
      acc += trip.flightCost * trip.travelers
      return acc
    }, 0)
  }

  // method for trip request 
  requestTrip() {
    // builds object for POST
  }
}

export default Traveler;