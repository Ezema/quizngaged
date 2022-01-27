const express = require("express");
const cors = require("cors");

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

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

/* const db = require("../app/models");
db.sequelize.sync(); */

// simple route
app.get("/", (req, res) => {  
  
});

app.get("/my-classrooms", (req, res) => {  
  res.send("my classrooms")
});

app.post("/",(req, res)=>{
  
  //validate tokenID received in the HTTP request
  admin.auth().verifyIdToken(req.body.idToken).then(
    (decodedToken) => {      
        // user has account?
        // user doesn't have account? select teacher/student

        res.redirect('/my-classrooms')
        return
    }).catch((error)=>{
      //The auth token was forked (trying to by-pass user authentication for DDoS attack for example); 
      console.log("error: ", error)
      return});

})

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});