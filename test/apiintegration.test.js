var express = require("express");
var request = require("supertest");
var app = express();
var routes = require("../Model/routes");

describe("api-check-data API Integration Testing", function() {
  describe("Postive Scenarios", function() {
    it.only("#IT_0001 :: Correct URL", function(done) {
      app.use("/api/v1", routes);
      request(app)
        .get("/api/v1/currentdate")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });
  describe("Negative Scenarios", function() {
    it("#IT_NEG_0001 :: If Day of the Date is not Prime", function(done) {
      app.use("/api/v1", routes);
      request(app)
        .get("/api/v1/currentdate")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(500, done);
    });
    it("#IT_NEG_0002 :: Bad URL", function(done) {
      app.use("/api/v1", routes);
      request(app)
        .get("/api/v1/currentdat")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400, done);
    });
    it("#IT_NEG_0003 :: Bad URL_Primary Path", function(done) {
      app.use("*", routes);
      request(app)
        .get("/api/v/currentdate")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400, done);
    });
  });
});
