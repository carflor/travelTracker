import { expect } from 'chai';
import Traveler from '../src/Traveler';
import travelerTestData from './traveler-test-data';
import tripTestData from './trip-test-data';
import TripRepo from '../src/TripRepo';

describe('Traveler', function() {
  let travelerData, traveler, trips;

  beforeEach(function() {
    trips = new TripRepo(tripTestData);
    travelerData = travelerTestData[1];
    traveler = new Traveler(travelerData, trips);
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
    expect(traveler.tripHistory).to.deep.equal([{
      "id": 89,
      "userID": 2,
      "destinationID": 10,
      "dailyLodging": 90,
      "flightCost": 450,
      "travelers": 5,
      "date": "2019/09/27",
      "duration": 13,
      "status": "approved",
      "suggestedActivities": []
    },
    {
      "id": 100,
      "userID": 2,
      "destinationID": 6,
      "dailyLodging": 70,
      "flightCost": 890,  
      "travelers": 6,
      "date": "2020/3/28",
      "duration": 10,
      "status": "approved",
      "suggestedActivities": []
    },
    {
      "id": 116,
      "userID": 2,
      "destinationID": 7,
      "dailyLodging": 100,
      "flightCost": 395,
      "travelers": 3,
      "date": "2020/04/03",
      "duration": 8,
      "status": "approved",
      "suggestedActivities": []
    },
    {
      "id": 166,
      "userID": 2,
      "destinationID": 7,
      "dailyLodging": 100,
      "flightCost": 395,
      "travelers": 2,
      "date": "2020/03/05",
      "duration": 6,
      "status": "approved",
      "suggestedActivities": []
    },
    {
      "id": 171,
      "userID": 2,
      "destinationID": 43,
      "dailyLodging": 550,
      "flightCost": 90,
      "travelers": 1,
      "date": "2020/12/27",
      "duration": 18,
      "status": "pending",
      "suggestedActivities": []
    }, 
    {
      "id": 177,
      "userID": 2,
      "destinationID": 20,
      "dailyLodging": 158,
      "flightCost": 275,
      "travelers": 6,
      "date": "2020/01/29",
      "duration": 8,
      "status": "approved",
      "suggestedActivities": []
    }]);
  });

  it('it should get pending trips', function() {
    expect(traveler.getPendingTrips()).to.deep.equal([trips.allTrips[5]]);
  });

  it('it should get list of trips for this year', function() {
    expect(traveler.getTripsThisYear()).to.deep.equal([{
      "id": 89,
      "userID": 2,
      "destinationID": 10,
      "dailyLodging": 90,
      "flightCost": 450,
      "travelers": 5,
      "date": "2019/09/27",
      "duration": 13,
      "status": "approved",
      "suggestedActivities": []
    },
    {
      "id": 100,
      "userID": 2,
      "destinationID": 6,
      "dailyLodging": 70,
      "flightCost": 890,  
      "travelers": 6,
      "date": "2020/3/28",
      "duration": 10,
      "status": "approved",
      "suggestedActivities": []
    },
    {
      "id": 116,
      "userID": 2,
      "destinationID": 7,
      "dailyLodging": 100,
      "flightCost": 395,
      "travelers": 3,
      "date": "2020/04/03",
      "duration": 8,
      "status": "approved",
      "suggestedActivities": []
    },
    {
      "id": 166,
      "userID": 2,
      "destinationID": 7,
      "dailyLodging": 100,
      "flightCost": 395,
      "travelers": 2,
      "date": "2020/03/05",
      "duration": 6,
      "status": "approved",
      "suggestedActivities": []
    }, 
    {
      "id": 177,
      "userID": 2,
      "destinationID": 20,
      "dailyLodging": 158,
      "flightCost": 275,
      "travelers": 6,
      "date": "2020/01/29",
      "duration": 8,
      "status": "approved",
      "suggestedActivities": []
    }]);
  });

  it('it should get amount spent in trips for the year', function() {
    expect(traveler.getAmountSpentThisYear()).to.equal(15749);
  });

  it('it should get amount spent in trips for the year', function() {
    expect(traveler.futureTrips).to.deep.equal([]);
  });

  it.skip('it should set object for post trip request', function() {
    expect().to.deep.equal();
  });
});