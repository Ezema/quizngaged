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

/// ********* Below -> Connect to DB running via docker *********
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Test1234",
  database: "appdb",  
});
// connect to database
db.connect((err) => {
  if (err) {
    console.log("The docker DB is not running!");
    //throw err;
  }
  console.log("Connected to database");
});
global.db = db;

db.query("DROP TABLE myTable;",
  (err,result)=>{    
})
db.query("SHOW TABLES",(err,result)=>{
  if(err){
    console.log("Error while retrieving table: ", err)
  }else{
    console.log("These are the tables: ", result)
  }

})
db.query("CREATE TABLE myTable(uid int,user varchar(30));",
  (err,result)=>{
    if(err){
      console.log("Error while creating table: ", err)
    }

})
db.query("SHOW TABLES",(err,result)=>{
  if(err){
    console.log("Error while retrieving table: ", err)
  }else{
    console.log("These are the tables after creating one: ", result)
  }

})
/// ********* Above -> Connect to DB running via docker *********


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