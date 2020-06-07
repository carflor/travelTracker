class Destinations {
  constructor(allDestinations) {
    this.destinations = allDestinations;
  }
 
  getDestinationById(id) {
    return this.destinations.filter(city => city.id === id)
  }

  getDestinationCost(locationObj, groupAmount, dayAmount) {
    let lodging = locationObj.estimatedLodgingCostPerDay * dayAmount
    let flight = locationObj.estimatedFlightCostPerPerson * groupAmount
    return lodging + flight
  }
}

export default Destinations; 