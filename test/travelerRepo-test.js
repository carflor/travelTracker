import { expect } from 'chai';
import TravelerRepo from '../src/TravelerRepo';
import travelerTestData from './traveler-test-data';

describe('TravelerRepo', function() {
  let travelerData, allTravelers;

  beforeEach(function() {
    travelerData = travelerTestData;
    allTravelers = new TravelerRepo(travelerData);
  })

  it('it should be a function', function() {
    expect(TravelerRepo).to.be.a('function');
  });

  it('it should be an instance of Trip', function() {
    expect(allTravelers).to.be.an.instanceof(TravelerRepo);
  });

  it('it should have a property of all Travelers', function() {
    expect(allTravelers.allTravelers).to.equal(travelerData);
  });

  it('it should grab a traveler by ID', function() {
    expect(allTravelers.getTravelerById(1)).to.equal(travelerData[0]);
  });
});