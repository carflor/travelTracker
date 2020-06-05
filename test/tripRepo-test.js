import { expect } from 'chai';
import TripRepo from '../src/TripRepo';
import tripTestData from './trip-test-data.js';

describe('TripRepo', function() {
  let tripData, trips, singleTrip;

  beforeEach(function() {
    tripData = tripTestData;
    singleTrip = tripData[0]
    trips = new TripRepo(tripData);
  })

  it('it should be a function', function() {
    expect(TripRepo).to.be.a('function');
  });

  it('it should be an instance of Trip', function() {
    expect(trips).to.be.an.instanceof(TripRepo);
  });

  it('it should have a property of allTrips', function() {
    expect(trips.allTrips).to.equal(tripData);
  });

  it('it should have a property of restructured data', function() {
    expect(trips.dataPerUser).to.deep.equal({
      '2': [
        {
          id: 89,
          userID: 2,
          destinationID: 10,
          dailyLodging: 90,
          flightCost: 450,
          travelers: 5,
          date: '2019/09/27',
          duration: 13,
          status: 'approved',
          suggestedActivities: []
        },
        {
          id: 100,
          userID: 2,
          destinationID: 6,
          dailyLodging: 70,
          flightCost: 890,
          travelers: 6,
          date: '2020/3/28',
          duration: 10,
          status: 'approved',
          suggestedActivities: []
        },
        {
          id: 116,
          userID: 2,
          destinationID: 7,
          dailyLodging: 100,
          flightCost: 395,
          travelers: 3,
          date: '2020/04/03',
          duration: 8,
          status: 'approved',
          suggestedActivities: []
        },
        {
          id: 166,
          userID: 2,
          destinationID: 7,
          dailyLodging: 100,
          flightCost: 395,
          travelers: 2,
          date: '2020/03/05',
          duration: 6,
          status: 'approved',
          suggestedActivities: []
        },
        {
          id: 171,
          userID: 2,
          destinationID: 43,
          dailyLodging: 550,
          flightCost: 90,
          travelers: 1,
          date: '2020/12/27',
          duration: 18,
          status: 'pending',
          suggestedActivities: []
        },
        {
          id: 177,
          userID: 2,
          destinationID: 20,
          dailyLodging: 158,
          flightCost: 275,
          travelers: 6,
          date: '2020/01/29',
          duration: 8,
          status: 'approved',
          suggestedActivities: []
        }
      ],
      "44": [
        {
          "id": 1,
          "userID": 44,
          "destinationID": 49,
          "dailyLodging": 650,
          "flightCost": 90,
          "travelers": 1,
          "date": "2019/09/16",
          "duration": 8,
          "status": "approved",
          "suggestedActivities": []
        }
      ]});
  });

  it('it should grab a trip by ID', function() {
    expect(trips.getTripByUserId('44')).to.deep.equal([singleTrip]);
  });

  it('it should not return trip if argument is not passed', function() {
    expect(trips.getTripByUserId()).to.deep.equal(undefined);
  });
});