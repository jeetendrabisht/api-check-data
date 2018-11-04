const chai = require("chai");
chai.should();
chai.expect;

const primeValidator = require("../Validator/primeValidator");
var connectionResp = require("../Database/connection");

var sampleConnectionData = {
  coord: {
    lon: 77.22,
    lat: 28.65
  },
  weather: [
    {
      id: 721,
      main: "Haze",
      description: "haze",
      icon: "50n"
    }
  ],
  name: "Delhi"
};

var resp = {
  coord: {
    lon: 77.22,
    lat: 28.65
  },
  weather: [
    {
      id: 721,
      main: "Haze",
      description: "haze",
      icon: "50n"
    }
  ],
  name: "Delhi"
};

describe("api-check-data API Unit Testing", function() {
  describe("Postive Scenarios", function() {
    it("#UT_0001 :: Connection to DataBase", function(done) {
      connectionResp.connectionResp(resp, (err, res) => {
        if (err) {
          return done(err);
        } else {
          res.name.should.equal(sampleConnectionData.name);
          done();
        }
      });
    });
  });

  describe("Negative Scenarios", function() {
    it("#UT_NEG_0001 :: Day of the Date is not Prime", function(done) {
      primeValidator.primeValidator().should.equal(false);
      done();
    });
  });
});
