import chai from 'chai';
import { expect } from 'chai';
import ApiFetch from '../src/ApiFetch'
const spies = require('chai-spies');
chai.use(spies);

describe('ApiFetch', function() {
  let api, window;
  
  beforeEach(function() {
    api = new ApiFetch()
    // window.fetch = () => {
    //   return Promise.resolve({
    //     ok: true,
    //     json: () => Promise.resolve({
    //       x: true,
    //     }),
    //   }) 
    // }
    window.fetch = {}
    chai.spy.on(fetch, '', () => { })
  })
  
  it('should have a property of rootUrl', function() {
    expect(api.urlRoot).to.equal('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data');
  });
  
  it('should get all travelers', function() {
    api.getTravelers();
    expect(fetch).to.have.been.called(1);
    // expect(api.getTravelers()).to.equal(fetch(url).then(response => response.json()).catch(err => console.log(err.message)));
  });
});