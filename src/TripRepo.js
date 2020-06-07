class TripRepo {
  constructor(allTrips) {
    this.allTrips = allTrips;
    this.dataPerUser = this.grabDataPerUser()
  }

  grabDataPerUser() {
    return this.allTrips.reduce((acc, trip) => {
      if (!acc[trip.userID]) {
        acc[trip.userID] = []
      }
      acc[trip.userID].push(trip)
      return acc
    }, {})
  }

  getTripByUserId(id) {
    if (typeof id === 'string') {
      // return this.allTrips.filter(trip => trip.userID === id)
      return this.dataPerUser[id]
    }
  }
}

export default TripRepo;