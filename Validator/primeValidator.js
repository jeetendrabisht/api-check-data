/*

This file contains information for day is prime or not.

*/
var log = require("../Logger/logger").logger();
var primeValidator = function() {
  log.info("Inside primeValidator function of primeValidator.js file");
  var day = new Date().getDate();
  if (day === 2) {
    return true;
  } else if (day > 1) {
    for (var i = 2; i < day; i++) {
      if (day % i !== 0) {
        return true;
      } else if (day === i * i) {
        return false;
      } else {
        return false;
      }
    }
  } else {
    return false;
  }
};

exports.primeValidator = primeValidator;
