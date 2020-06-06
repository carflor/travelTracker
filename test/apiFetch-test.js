import chai from 'chai';
import { expect } from 'chai';
import ApiFetch from '../src/ApiFetch'
const spies = require('chai-spies');
chai.use(spies);

describe.skip('ApiFetch', function() {
  let api, fetch;
  
  beforeEach(function() {
    api = new ApiFetch()
    global.fetch = () => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          x: true,
        }),
      }) 
    }
    chai.spy.on(api, 'fetch', () => { })
    // window.fetch = {}
    // let newPromise = new Promise() 
    // do i need another chai spy for the fetch specifically? 
  })
  
  it('should have a property of rootUrl', function() {
    expect(api.urlRoot).to.equal('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data');
  });
  
  it('should get all travelers', function() {
    api.getTravelers();
    expect(fetch).to.have.been.called(1);
    // expect(api.getTravelers()).to.equal(fetch(url).then(response => response.json()).catch(err => console.log(err.message)));
  });

  it.skip('should get all trips', function() {
    expect(api.getTrips()).to.equal(fetch(url).then(response => response.json()).catch(err => console.log(err.message)));
  });

  it.skip('should get all travel destinations', function() {
    expect(api.getDestinations()).to.equal(fetch(url).then(response => response.json()).catch(err => console.log(err.message)));
  });
});

// NOTES ON SPY FROM PAST PROJECT
// beforeEach(function() {
//   global.document = {};
//   chai.spy.on(document, "querySelector", () => {return global.document});
//   chai.spy.on(document, "insertAdjacentHTML", () => {})
// });
// it('should call createUserDisplay', function() {
//   domUpdates.createUserDisplay(users[0]);
//   expect(document.querySelector).to.have.been.called(1);
//   expect(document.querySelector).to.have.been.called.with(".banner-image");
//   expect(document.insertAdjacentHTML).to.have.been.called(1);
// })