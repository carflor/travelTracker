class TripRepo {
  constructor(allTrips) {
    this.allTrips = allTrips;
    this.dataPerUser = this.grabDataPerUser()
  }

  grabDataPerUser() {
    let result = this.allTrips.reduce((acc, trip) => {
      if (!acc[trip.userID]) {
        acc[trip.userID] = []
      }
      acc[trip.userID].push(trip)
      return acc
    }, {})
    return result
  }

  getTripByUserId(id) {
    if (typeof id === 'number') {
      return this.allTrips.filter(trip => trip.userID === id)
    }
  }
}

export default TripRepo;