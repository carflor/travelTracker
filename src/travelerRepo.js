class TravelerRepo {
  constructor(allTravelers) {
    this.allTravelers = allTravelers;
  }

  getTravelerById(id) {
    return this.allTravelers.find(traveler => traveler.id === id)
  }
}

export default TravelerRepo;