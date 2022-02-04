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
    password: "password",
    database: "appdb",  
  });
  // connect to database
  db.connect((err) => {
    if (err) {
      console.log("The docker DB is not running!");
      //throw err;
    }else{
        console.log("Connected to database");
        let sqlQuery = "CREATE TABLE IF NOT EXISTS users (uid VARCHAR(50),userjson json);"
        let secondSqlQuery = "CREATE TABLE IF NOT EXISTS classrooms (uniqueclassroomid INT UNSIGNED NOT NULL AUTO_INCREMENT,classroomjson json,classroomowneruid VARCHAR(50), PRIMARY KEY(uniqueclassroomid));"
        db.query(sqlQuery,(err,result)=>{
            console.log("first table ok");
        })
        db.query(secondSqlQuery,(err,result)=>{
            console.log("second table ok");
        })
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

app.post("/API/getuserJSON",(req, res)=>{    
    
    //validate user UID received in the HTTP request
    admin.auth().verifyIdToken(req.body.federatedAuthDecodedToken).then(
    () => {      
            let sqlQuery = `SELECT userjson FROM users WHERE uid='${req.body.uid}';`

            console.log("/API/getuserJSON DB Query: ", sqlQuery)

            db.query(sqlQuery, (err, result)=>{
                if (err) {
                    console.log("error with db query")
                    //throw err;
                } 
                else {                    
                    console.log("\n")
                    console.log("the retrieved userjson: ", result[0].userjson)
                    console.log("\n")
                    res.send({"userjson":result[0]})
                }    
            });
            return
    }).catch((error)=>{
        //The auth token was forked (trying to by-pass user authentication for DDoS attack for example); 
        console.log("error: ", error)
        return
    });    
})
app.post("/API/saveuserJSON",(req, res)=>{
    
    //console.log("/API/saveuserJSON: ", req.body)

    //let sqlQuery = `INSERT INTO users (uid, userjson) VALUES ("${req.body.uid}", '${req.body.userjson}');`

    //console.log("/API/saveuserJSON: ", sqlQuery)

    //sqlQuery = `UPDATE users SET userjson='${req.body.userjson}' WHERE uid="${req.body.uid}";`

    console.log("/API/saveuserJSON: ", new Date())

    //console.log("sqlQuery: ",sqlQuery)

    

        //req.body.federatedAuthDecodedToken
        //req.body.uid
        //req.body.userjson

    admin.auth().verifyIdToken(req.body.federatedAuthDecodedToken).then(
        () => {      
            let sqlQuery = `SELECT * FROM users WHERE uid="${req.body.uid}";`                        
            db.query(sqlQuery, (err, result)=>{
                if (err) {
                    console.log("error with db query")
                    //throw err;
                } 
                else {            
                    if(result.length==0){
                        let sqlQuery = `INSERT INTO users (uid, userjson) VALUES ("${req.body.uid}", '${(req.body.userjson)}');`
                        db.query(sqlQuery, (err, result)=>{
                            if(err){                                
                                res.send({'operationSuccessful':false})
                            }else{                                
                                console.log("\n")
                                console.log("the saved userjson: ", req.body.userjson)
                                console.log("\n")
                                res.send({'operationSuccessful':true})
                            }

                        })                                                
                    }else{
                        let sqlQuery = `UPDATE users SET userjson='${req.body.userjson}' WHERE uid="${req.body.uid}";`
                        db.query(sqlQuery, (err, result)=>{
                            if(err){                                
                                res.send({'operationSuccessful':false})
                            }else{                                
                                console.log("\n")
                                console.log("the saved userjson: ", req.body.userjson)                    
                                console.log("\n")
                                res.send({'operationSuccessful':true})
                            }

                        })
                    }
                }    
            });
            return
    }).catch((error)=>{
        //The auth token was forked (trying to by-pass user authentication for DDoS attack for example); 
        console.log("error: ", error)
        return
    });
})

app.post("/API/checkuserhasaccount",(req, res)=>{

    //console.log("/API/checkuserhasaccount: ", req.body)

    admin.auth().verifyIdToken(req.body.federatedAuthDecodedToken).then(
    () => {      
            let sqlQuery = `SELECT * FROM users WHERE uid="${req.body.uid}";`
            db.query(sqlQuery, (err, result)=>{
                if (err) {
                    console.log("error with db query")
                    //throw err;
                } 
                else {            
                    if(result.length==0){
                        res.send({"hasAccount":false})  
                    }else{                        
                        res.send({"hasAccount":true})
                    }

                }    
            });
            return
    }).catch((error)=>{
        //The auth token was forked (trying to by-pass user authentication for DDoS attack for example); 
        console.log("error: ", error)
        return
    });
})

app.post("/API/savenewuniqueclassroom",(req, res)=>{
    console.log("\n")
    console.log("/API/savenewuniqueclassroom: ")

    admin.auth().verifyIdToken(req.body.federatedAuthDecodedToken).then(
    () => {      
            let sqlQuery = `INSERT INTO classrooms (classroomjson,classroomowneruid) VALUES ('${req.body.classroomjson}','${req.body.uid}');`
            console.log("sql query: ", sqlQuery)
            db.query(sqlQuery, (err, result)=>{
                if (err) {
                    
                    console.log("error with db query")
                    //throw err;
                } 
                else { 
                    res.send({'globalUniqueID':result.insertId})
                }    
            });
            return
    }).catch((error)=>{
        //The auth token was forked (trying to by-pass user authentication for DDoS attack for example); 
        console.log("error: ", error)
        return
    });
})

app.post("/API/checkclassroomuniqueidisvalid",(req, res)=>{
    console.log("\n")
    console.log("/API/checkclassroomuniqueidisvalid: ")

    admin.auth().verifyIdToken(req.body.federatedAuthDecodedToken).then(
    () => {      
            let sqlQuery =`SELECT uniqueclassroomid FROM classrooms WHERE uniqueclassroomid = '${req.body.classroomUniqueId}';`            
            db.query(sqlQuery, (err, result)=>{
                if (err) {
                    
                    console.log("error with db query")                    
                    //throw err;
                } 
                else {
                    console.log("query result: ", result)
                    if(result.length==0){
                        res.send({'uniqueClassroomIDValidity':false})
                    }else{
                        res.send({'uniqueClassroomIDValidity':true})
                    }
                    
                }    
            });
            return
    }).catch((error)=>{
        //The auth token was forked (trying to by-pass user authentication for DDoS attack for example); 
        console.log("error: ", error)
        return
    });
})

// set port, listen for requests
const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
