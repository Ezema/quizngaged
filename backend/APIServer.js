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

  db.query("select count(*) from institutions", (err, result) => {
    if (err) {
      console.log("QuizNgaged schema does not exist, create it first")
      throw err;
    } else {
      console.log("QuizNgaged schema exists")
    }
  });

  global.db = db;
    
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

app.post("/API/checkuserhasaccount",(req, res)=>{
    
    
    //console.log("From the backend the user is: ",req.body.user)
    /* 
    This are the valid keys to use

    uid: 'RLeDDh2',
    email: 'someuser@gmail.com',
    emailVerified: true,
    displayName: 'Some User',
    isAnonymous: false,
    photoURL:

    */
    
    // temporary solution to tie user to the uid, update the teacher row with it
    // TODO figure out how to do it properly
    //  1. make uid mandatory, if the user not in the db, create a new user row with this uid
    //  2. should it be updateable?
    //  3. remove this update statement, don't update all teachers to same uid!
    //  4. and allow other user types, currently this acts like everyone is one teacher
    db.query("update users set uid = ? where is_teacher = TRUE",[String(req.body.user.uid)],(err,result)=>{
      if(err){
          console.log("Unable to set teacher uid", err)
      }else{            
        console.log("updated teacher uid to ", String(req.body.user.uid))
      }    
    })

    db.query("SELECT * FROM users WHERE uid=?",[String(req.body.user.uid)],(err,result)=>{
        if(err){
            console.log("Error while retrieving the UID: ", err)
        }else{            
            if(result.length==0){
                res.send({'hasAccount':false})
            }
            else{
                res.send({'hasAccount':true})
            }
        }
      
    })
})

app.post("/API/uploaduserdata",(req, res)=>{
  res.send({'opertionSuccess':true})
}
)

// set port, listen for requests
const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
