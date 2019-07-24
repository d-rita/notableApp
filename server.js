const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");

const db = require("./app/config/db")

const app = express();

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, client) => {
  if(err) return console.log(err)
  var db = client.db("test")
  require('./app/routes')(app, db);
  client.close();
  app.listen(port, () => {
    console.log("We are listening on port " + port);
  })
});
