import { expect } from 'chai';
import Traveler from '../src/Traveler';
import travelerTestData from './traveler-test-data';
import tripTestData from './trip-test-data';
import TripRepo from '../src/TripRepo';

describe('Traveler', function() {
  let travelerData, traveler, trips;

  beforeEach(function() {
    travelerData = travelerTestData[1];
    trips = new TripRepo(tripTestData);
    traveler = new Traveler(travelerData, trips.dataPerUser['2']);
  })

  it('it should be a function', function() {
    expect(Traveler).to.be.a('function');
  });

  it('it should be an instance of Trip', function() {
    expect(traveler).to.be.an.instanceof(Traveler);
  });

  it('it should have a property of id', function() {
    expect(traveler.id).to.equal(2);
  });

  it('it should have a property of name', function() {
    expect(traveler.name).to.equal("Rachael Vaughten");
  });

  it('it should have a property of type', function() {
    expect(traveler.travelerType).to.equal("thrill-seeker");
  });

  it('it should have property of travelers trip history', function() {
    const filtered = trips.allTrips.filter(trip => trip.userID !== 44)
    expect(traveler.tripHistory).to.deep.equal(filtered);
  });

  it('it should get pending trips', function() {
    expect(traveler.getPendingTrips()).to.deep.equal([trips.allTrips[5]]);
  });

  it('it should get list of trips for this year', function() {
    expect(traveler.getTripsThisYear()).to.deep.equal(traveler.yearsTrips)
  });

  it('it should get amount spent in trips for the year', function() {
    expect(traveler.getAmountSpentThisYear()).to.equal('0.00');
  });

  it('it should get amount spent in trips for the year', function() {
    expect(traveler.futureTrips).to.deep.equal([{
      "id": 177,
      "userID": 2,
      "travelerName": "Rachael Vaughten",
      "destinationID": 20,
      "dailyLodging": 158,
      "flightCost": 275,
      "travelers": 6,
      "date": "2020/06/29",
      "duration": 8,
      "status": "approved",
      "suggestedActivities": []
    }]);
  });
});