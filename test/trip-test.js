import { expect } from 'chai';
import Trip from '../src/Trip';
import tripTestData from './trip-test-data.js';

describe('Trip', function() {
  let trip, newTrip;

  beforeEach(function() {
    trip = tripTestData[0];
    newTrip = new Trip(trip);
  })

  it('it should be a function', function() {
    expect(Trip).to.be.a('function');
  });

  it('it should be an instance of Trip', function() {
    expect(newTrip).to.be.an.instanceof(Trip);
  });

  it('it should have a property of trip ID', function() {
    expect(newTrip.id).to.equal(1);
  });

  it('it should have default property of trip ID', function() {
    let newTrip2 = new Trip({})
    expect(newTrip2.id).to.equal(Date.now());
  });

  it('it should have a property of userID', function() {
    expect(newTrip.userID).to.equal(44);
  });

  it('it should have a property of destinationID', function() {
    expect(newTrip.destinationID).to.equal(49);
  });

  it('it should have a property of travelers', function() {
    expect(newTrip.travelers).to.equal(1);
  });

  it('it should have a property of date', function() {
    expect(newTrip.date).to.equal("2019/09/16");
  });

  it('it should have a property of duration', function() {
    expect(newTrip.duration).to.equal(8);
  });

  it('it should have a property of status', function() {
    expect(newTrip.status).to.equal("approved");
  });

  it('it should have a default property of status', function() {
    let newTrip2 = new Trip({})
    expect(newTrip2.status).to.equal("pending");
  });

  it('it should have a property of suggested activitites', function() {
    expect(newTrip.suggestedActivities).to.deep.equal([]);
  });
});