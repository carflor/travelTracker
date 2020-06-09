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
    agent = new Agent(travelers, trips.allTrips, destinations)
  
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
    console.log(trips, 'in test')
    expect(agent.allTrips).to.deep.equal(trips.allTrips);
  });

  it('it should have property of all Destinations', function() {
    expect(agent.allDestinations).to.deep.equal(destinations);
  });

  it('it should grab all trips for the year', function() {
    expect(agent.grabTripsForYear()).to.deep.equal(agent.yearsTrips)
  });

  it('it should calculate estimated yearly income for agency', function() {
    expect(agent.calculateTotalYearIncome()).to.equal(941.5);
  });

  it('it should search users by name', function() {
    expect(agent.searchByUserName('ham')).to.deep.equal([travelers.allTravelers[0]]);
  });

  it('it should get all users currently on trips', function() {
    expect(agent.getAllUsersOnTrips()).to.deep.equal([]);
  });
});