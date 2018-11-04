const mongoose = require("mongoose");
var constants = require("../Constants/constants");
mongoose.Promise = global.Promise;
var log = require("../Logger/logger").logger();
require("dotenv").config();
var MONGO_URI = process.env.MONGO_URI || false;

var connectionResp = function(respParse, callback) {
  log.info("Inside connectionResp function og connection.js file");
  if (MONGO_URI) {
    mongoose.connect(
      MONGO_URI,
      { useNewUrlParser: true },
      function(err) {
        if (err) {
          callback(err, null);
        }
      }
    );
  } else {
    callback({ ALERT: constants.SET_ENV }, null);
  }

  var weatherData = mongoose.model("weatherData", {
    name: {
      type: String,
      required: true
    },
    coord: {
      type: Object,
      required: true
    },
    weather: {
      type: String,
      required: true
    }
  });

  var newWeatherData = new weatherData({
    name: respParse.name,
    coord: {
      Longitude: respParse.coord.lon,
      Lattitude: respParse.coord.lat
    },
    weather: respParse.weather[0].description
  });

  newWeatherData.save().then(
    data => {
      callback(null, data);
    },
    errorDatabase => {
      callback(errorDatabase, null);
    }
  );
};

exports.connectionResp = connectionResp;
