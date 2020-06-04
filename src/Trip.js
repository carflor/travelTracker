class Trip {
  constructor(userID, destinationID, travelers, date, duration, status) {
    // this.id = randomize an id for the trip
    this.userID = userID;
    this.destinationID = destinationID;
    this.travelers = travelers;
    this.date = date;
    this.duration = duration; 
    this.status = status || 'pending';
    this.suggestedActivities = [];

  }
}

export default Trip; 