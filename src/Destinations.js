class Destinations {
  constructor(allDestinations) {
    this.destinations = allDestinations;
  }

  // method for grabbing a destination by ID 
  getDestinationById(id) {
    this.destinations.filter(city => city.id === id)
  }

  // method for calculating cost for travel for this destination
  // getDestinationCost(location, groupAmount, dayAmount) {

  // }
}

export default Destinations; 