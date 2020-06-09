class Trip {
  constructor(tripObj) {
    this.id = tripObj.id || Date.now();
    this.userID = tripObj.userID;
    this.destinationID = tripObj.destinationID;
    this.travelers = tripObj.travelers || 1;
    this.date = tripObj.date;
    this.duration = tripObj.duration; 
    this.status = tripObj.status || 'pending';
    this.suggestedActivities = tripObj.suggestedActivities;
  }
}

export default Trip; 