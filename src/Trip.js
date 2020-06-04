class Trip {
  constructor(tripObj) {
    // this.id = randomize an id for the trip
    this.id = tripObj.id || Date.now();
    this.userID = tripObj.userID;
    this.destinationID = tripObj.destinationID;
    this.travelers = tripObj.travelers;
    this.date = tripObj.date;
    this.duration = tripObj.duration; 
    // should pending be default value?
    this.status = tripObj.status || 'pending';
    this.suggestedActivities = tripObj.suggestedActivities;

  }
}

export default Trip; 