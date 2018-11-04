/*
This file contains information for the server, using express framework.
*/
const express = require("express");
const app = express();
var routes = require("./Model/routes");
var log = require("./Logger/logger").logger();

require("dotenv").config();
// set PORT
app.set("PORT", process.env.PORT_API || 3000);

// Route
app.use("/api/v1", routes);
app.use("*", routes);
// Server Listening
app.listen(app.get("PORT"), err => {
  if (err) {
    throw new err();
  }
  log.info(`Server listening at port ${app.get("PORT")}`);
});
