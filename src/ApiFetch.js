class ApiFetch {
  constructor() {
    this.urlRoot = 'https://fe-apps.herokuapp.com/api/v1/travel-tracker/data'
  }

  // getMethod for Single User (should this be used as opposed to all users w/ filter?)
  getTravelerById(id) {
    let url = `${this.urlRoot}/travelers/travelers/${id}`;
    console.log(id);
    return fetch(url).then(response => response.json());
  }

  getTravelers() {
    let url = `${this.urlRoot}/travelers/travelers`;
    return fetch(url).then(response => response.json()).catch(err => console.log(err.message))
  }

  getTrips() {
    let url = `${this.urlRoot}/trips/trips`;
    return fetch(url).then(response => response.json()).catch(err => console.log(err.message))
  }

  getDestinations() {
    let url = `${this.urlRoot}/destinations/destinations`;
    return fetch(url).then(response => response.json()).catch(err => console.log(err.message))
  }

  postTripRequest(tripRequestObj) {
    let url = `${this.urlRoot}/trips/trips`;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tripRequestObj)
    })
      .then(response => console.log(response.json()))
      .then()
      .catch(err => console.log(err.message));
  }

  approveTrip(tripObj) {
    let url = `${this.urlRoot}/trips/updateTrip`;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tripObj)
    })
      .then(response => console.log(response.json()))
      .catch(err => console.log(err.message));
  }

  cancelTrip(tripObj) {
    let url = `${this.urlRoot}/trips/trips`;
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tripObj)
    })
      .then(response => console.log(response.json()))
      .catch(err => console.log(err.message));
  }
}

export default ApiFetch;