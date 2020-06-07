import { expect } from 'chai';
import Destinations from '../src/Destinations';
import destinationsTestData from './destinations-test-data.js';

describe('Destinations', function() {
  let destinationsInfo, allDestinations, destination;

  beforeEach(function() {
    destinationsInfo = destinationsTestData;
    destination = destinationsTestData[0];
    allDestinations = new Destinations(destinationsInfo);
  })

  it('it should be a function', function() {
    expect(Destinations).to.be.a('function');
  });

  it('it should be an instance of Destinations', function() {
    expect(allDestinations).to.be.an.instanceof(Destinations);
  });

  it('it should have property of allDestinations', function() {
    expect(allDestinations.destinations).to.equal(destinationsInfo);
  });

  it('it should grab destination by ID', function() {
    expect(allDestinations.getDestinationById(1)).to.deep.equal([destination]);
  });

  it('it should calculate estimated travel cost traveler', function() {
    expect(allDestinations.getDestinationCost(destination, 1, 1)).to.deep.equal(470);
  });

  it('it should calculate estimated travel cost for groups', function() {
    expect(allDestinations.getDestinationCost(destination, 10, 10)).to.deep.equal(4700);
  });
});