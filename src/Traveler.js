import moment from 'moment';
class Traveler {
  constructor(user, allTrips) {
    this.id = user.id;
    this.name = user.name;
    this.travelerType = user.travelerType;
    this.tripHistory = allTrips;
    this.yearsTrips = this.getTripsThisYear();
    this.futureTrips = this.getFutureTrips();
    this.pendingTrips = this.getPendingTrips();
  }
  
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

  getCurrentTrip() {
    return this.tripHistory.reduce((acc, trip) => {
      let tripDate = trip.date;
      let tripEndDate = moment().add(trip.duration, 'day').format("YYYY/MM/DD")
      if (moment(tripDate).isBetween(tripDate, tripEndDate) && trip.travelerName.id === this.id) {
        acc.push(trip)
      }
      return acc
    }, [])
  }

  getPastTrips() {
    let today = moment().format("YYYY/MM/DD")
    return this.tripHistory.reduce((acc, trip) => {
      let tripDate = trip.date
      if (moment(tripDate).isBefore(today)) {
        acc.push(trip)
      }
      return acc
    }, [])
  }

  getPendingTrips() {
    return this.tripHistory.filter(trip => trip.status === 'pending')
  }

  getTripsThisYear() {
    let firstDayYear = moment("2020/01/01").format("YYYY/MM/DD")
    let lastDayYear = moment("2020/12/31").format("YYYY/MM/DD")
    return this.tripHistory.reduce((acc, trip) => {
      let tripDate = trip.date
      if (moment(tripDate).isBetween(firstDayYear, lastDayYear) && trip.travelerName.id === this.id) {
        acc.push(trip)
      }
      return acc
    }, [])
  }

  getAmountSpentThisYear() {
    let yearAmount = this.yearsTrips.reduce((acc, trip) => {
      let lodging = trip.duration * trip.dailyLodging
      let totalFlight = trip.flightCost * trip.travelers
      let total = lodging + totalFlight
      let percent = total * .1
      let finalPrice = percent + total
      return acc += finalPrice
    }, 0)
    return yearAmount.toFixed(2)
  }
}

export default Traveler;