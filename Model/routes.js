/* 
This file is for routing and fetching response.
*/
const request = require("request-promise");
var connectionResp = require("../Database/connection");
var primeValidator = require("../Validator/primeValidator").primeValidator();
var log = require("../Logger/logger").logger();
var constants = require("../Constants/constants");
require("dotenv").config();
var WEATHER_URI = process.env.WEATHER_URI || false;

module.exports = (function() {
  log.info("Inside routes file :: routes");
  ("use strict");
  var routes = require("express").Router();
  routes.get("/currentdate", (req, response) => {
    log.info(req.url);
    if (primeValidator === constants.TRUE) {
      if (WEATHER_URI) {
        request(WEATHER_URI)
          .then(resp => {
            var respParse = JSON.parse(resp);
            connectionResp.connectionResp(
              respParse,
              (errOutput, connectOutput) => {
                if (errOutput) {
                  if (errOutput.ALERT) {
                    log.error(errOutput);
                    response.status(constants.ERR_400).send(errOutput);
                  } else if (errOutput.name === constants.MONGO_NETWORK_ERROR) {
                    log.error(errOutput);
                    response.status(constants.ERR_501).send(errOutput);
                  } else {
                    log.error(errOutput);
                    response.status(constants.ERR_500).send(errOutput);
                  }
                } else {
                  log.info(connectOutput);
                  response.status(constants.ERR_200).send(connectOutput);
                }
              }
            );
          })
          .catch(err => {
            if (err.error) {
              var parseError = JSON.parse(err.error);
              if (parseError.cod === constants.ERR_401) {
                log.error(parseError);
                response
                  .status(parseError.cod)
                  .send({ ERROR: parseError.message });
              } else if (parseError.cod === constants.ERR_404) {
                log.error(parseError);
                response
                  .status(parseError.cod)
                  .send({ ERROR: parseError.message });
              } else {
                log.error(err);
                response.status(constants.ERR_500).send({ ERROR: err.error });
              }
            } else {
              log.error(err.error);
              response.status(constants.ERR_500).send({ ERROR: err });
            }
          });
      } else {
        log.error({ ALERT: constants.SET_ENV });
        response.status(constants.ERR_400).send({ ALERT: constants.SET_ENV });
      }
    } else {
      log.error({ ALERT: constants.INTERNAL_SERVER_ERROR });
      response
        .status(constants.ERR_500)
        .send({ ALERT: constants.INTERNAL_SERVER_ERROR });
    }
  });
  routes.all("*", function(req, response) {
    log.error(req.url);
    response.status(constants.ERR_400).send({ ERROR: constants.BAD_REQUEST });
  });
  return routes;
})();
