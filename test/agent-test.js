import { expect } from 'chai';
import Agent from '../src/Agent';
import destinationsTestData from './destinations-test-data';
import tripTestData from './trip-test-data'
import TripRepo from '../src/TripRepo.js'
import travelerTestData from './traveler-test-data'
import Destinations from '../src/Destinations';
import TravelerRepo from '../src/TravelerRepo';

describe('Agent', function() {
  let destinations, trips, travelers, agent;

  beforeEach(function() {
    destinations = new Destinations(destinationsTestData)
    trips = new TripRepo(tripTestData)
    travelers = new TravelerRepo(travelerTestData)
    agent = new Agent(travelers, trips, destinations)
  
  })

  it('it should be a function', function() {
    expect(Agent).to.be.a('function');
  });

  it('it should be an instance of Destinations', function() {
    expect(agent).to.be.an.instanceof(Agent);
  });

  it('it should have property of name', function() {
    expect(agent.name).to.equal('agent');
  });

  it('it should have property of all Travelers', function() {
    expect(agent.allTravelers).to.deep.equal(travelers);
  });

  it('it should have property of all Trips', function() {
    expect(agent.allTrips).to.deep.equal(trips);
  });

  it('it should have property of all Destinations', function() {
    expect(agent.allDestinations).to.deep.equal(destinations);
  });

  it('it should grab all trips for the year', function() {
    expect(agent.grabTripsForYear()).to.deep.equal([
      {
        id: 1,
        userID: 44,
        travelerName: 'Marijo MacNeilley',
        destinationID: 49,
        dailyLodging: 650,
        flightCost: 90,
        travelers: 1,
        date: '2019/09/16',
        duration: 8,
        status: 'approved',
        suggestedActivities: []
      },
      {
        id: 89,
        userID: 2,
        travelerName: 'Rachael Vaughten',
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
        travelerName: 'Rachael Vaughten',
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
        travelerName: 'Rachael Vaughten',
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
        travelerName: 'Rachael Vaughten',
        destinationID: 7,
        dailyLodging: 100,
        flightCost: 395,
        travelers: 2,
        date: '2020/03/05',
        duration: 6,
        status: 'approved',
        suggestedActivities: []
      }
    ]);
  });

  it('it should calculate estimated yearly income for agency', function() {
    expect(agent.calculateTotalYearIncome()).to.equal(165);
  });

  it('it should search users by name', function() {
    expect(agent.searchByUserName('ham')).to.deep.equal([travelers.allTravelers[0]]);
  });

  it('it should get all users currently on trips', function() {
    expect(agent.getAllUsersOnTrips()).to.deep.equal([]);
  });
});