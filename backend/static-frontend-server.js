const express = require("express");
const cors = require("cors");
const mysql = require("mysql");


/// ********* Below -> Auth functionality *********
let admin = require("firebase-admin");
let serviceAccount = require("./secret-key.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
/// ********* Above -> Auth functionality *********

const app = express();

//allow all origins at least while under development
var corsOptions = {
  origin: '*'
};
app.use(cors(corsOptions));

//example of GET request
app.get("/", (req, res) => {  
  res.send("hi")
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});