const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const scorer = require('./customFunctions/answersScoring.js')


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
        let createUsers = "CREATE TABLE IF NOT EXISTS users (uid VARCHAR(50),userjson json);"
        let createClassrooms = "CREATE TABLE IF NOT EXISTS classrooms (uniqueclassroomid INT UNSIGNED NOT NULL AUTO_INCREMENT,classroomjson json,classroomowneruid VARCHAR(50), PRIMARY KEY(uniqueclassroomid));"
        let createLaunchedQuizzes = "CREATE TABLE IF NOT EXISTS launched_quizzes (launchedquizid INT UNSIGNED NOT NULL AUTO_INCREMENT,uniqueclassroomid INT UNSIGNED NOT NULL, quiz_state ENUM('IN_PROGRESS', 'IN_REVIEW', 'REVIEWED') NOT NULL, quizjson json, PRIMARY KEY(launchedquizid));"
        let createUserQuizzes = "CREATE TABLE IF NOT EXISTS user_quizzes (userquizzid INT UNSIGNED NOT NULL AUTO_INCREMENT,launchedquizid INT UNSIGNED NOT NULL,uid VARCHAR(50), answersjson json, PRIMARY KEY(userquizzid));"
        db.query(createUsers,(err,result)=>{
          if (err) {
            console.log("error creating users", err);
            throw err;
          }
        });
        db.query(createClassrooms,(err,result)=>{
          if (err) {
            console.log("error creating classrooms", err);
            throw err;
          }
        });
        db.query(createLaunchedQuizzes,(err,result)=>{
          if (err) {
            console.log("error creating launched quizzes", err);
            throw err;
          }
        });
        db.query(createUserQuizzes,(err,result)=>{
          if (err) {
            console.log("error creating user quizzes", err);
            throw err;
          }
        });
        console.log("db initialized");
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
            console.log("\n")
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

app.post("/API/updateuniqueclassroom",(req, res)=>{
    console.log("\n")
    console.log("/API/updateuniqueclassroom: ")

    admin.auth().verifyIdToken(req.body.federatedAuthDecodedToken).then(
    () => {      
            let sqlQuery = `UPDATE classrooms SET classroomjson=('${req.body.classroomjson}') WHERE uniqueclassroomid="${req.body.uniqueclassroomid}";`
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
            let sqlQuery =`SELECT * FROM classrooms WHERE uniqueclassroomid = '${req.body.classroomUniqueId}';`            
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
                        res.send({'uniqueClassroomIDValidity':true,'classroomjson':result[0].classroomjson,'uniqueclassroomid':result[0].uniqueclassroomid,
                        'classroomowneruid':result[0].classroomowneruid})
                    }

                }    
            });
            return
    }).catch((error)=>{
        //The auth token was forked (trying to by-pass user authentication for DDoS attack for example); 
        console.log("error: ", error)
        return
    });
});

app.post("/API/addlivequizzesforclassroom",(req, res)=>{
  console.log("\n")
  console.log("/API/addlivequizzesforclassroom: ")

  admin.auth().verifyIdToken(req.body.federatedAuthDecodedToken).then(
  () => {      
          let sqlQuery ="SELECT * FROM classrooms WHERE uniqueclassroomid = ?";
          db.query(sqlQuery, [req.body.classroomUniqueId], (err, result)=>{
              if (err) {
                  console.log("error with db query")
              } 
              else {
                  if(result.length==0){
                      res.send({'uniqueClassroomIDValidity':false})
                  }else{
                      let launchQuizQuery = "SELECT * FROM launched_quizzes WHERE uniqueclassroomid = ?";
                      let ongoingQuizzes = [];
                      db.query(launchQuizQuery, [req.body.classroomUniqueId], (err, resultQuizzes)=>{
                          if (err) {
                              console.log("error querying launched quizzes: ", err);
                          } else {
                              for (var i = 0; i < resultQuizzes.length; i++) {
                                  ongoingQuizzes.push(
                                      {
                                          launchedquizid: resultQuizzes[i].launchedquizid,
                                          uniqueclassroomid: resultQuizzes[i].uniqueclassroomid,
                                          quiz_state: resultQuizzes[i].quiz_state,
                                          quizjson: resultQuizzes[i].quizjson,
                                      }
                                  );
                              } 
                              res.send({'uniqueClassroomIDValidity':true,'classroomjson':result[0].classroomjson,'uniqueclassroomid':result[0].uniqueclassroomid,
                                'classroomowneruid':result[0].classroomowneruid, 'ongoingQuizzes':ongoingQuizzes});
                          }
                      });
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

app.post("/API/launchquiz",(req, res)=>{
  console.log("\n/API/launchquiz: "+req.body);

  admin.auth().verifyIdToken(req.body.federatedAuthDecodedToken).then(
  () => {      
    let insertQuery ="INSERT INTO launched_quizzes (uniqueclassroomid, quiz_state, quizjson) VALUES (?, 'IN_PROGRESS', ?)";
    db.query(insertQuery, [req.body.uniqueclassroomid, req.body.quizJson], (err, result)=>{
        if (err) {
            console.log("error inserting launched quiz")                    
        } 
        else {
            console.log("inserted launched quiz, id="+result.insertId);
        }    
    });
    return
  }).catch((error)=>{
      //The auth token was forked (trying to by-pass user authentication for DDoS attack for example); 
      console.log("error: ", error)
      return
  });
})

app.post("/API/studentjoinquiz",(req, res)=>{
  console.log("/API/studentjoinquiz: "+req.body);

  admin.auth().verifyIdToken(req.body.federatedAuthDecodedToken).then(
  () => {      
    let launchQuizQuery = "SELECT * FROM launched_quizzes WHERE launchedquizid = ?";
    db.query(launchQuizQuery, [req.body.quizId], (err, resultQuizzes)=>{
      if (err) {
        console.log("error querying launched quizzes: ", err);
      }
      else if (resultQuizzes.length == 0) {
        console.log("error querying launched quizzes: no quiz found for id="+req.body.quizId);
      } 
      else {
        // provide a callback, the selects/inserts that might happen appear to be async
        getOrInsertStudentAnswers(req.body.uid, resultQuizzes[0].launchedquizid, (answers) => {
          console.log("callback, answers: ", answers);
          res.send({
            'joinedQuiz': {
              launchedquizid: resultQuizzes[0].launchedquizid,
              uniqueclassroomid: resultQuizzes[0].uniqueclassroomid,
              quiz_state: resultQuizzes[0].quiz_state,
              quizjson: resultQuizzes[0].quizjson,
            },
            'studentAnswers': answers,
          });
        });
      }
    });
    return
  }).catch((error)=>{
    //The auth token was forked (trying to by-pass user authentication for DDoS attack for example); 
    console.log("error: ", error)
    return
  });
})

app.post("/API/updatestudentquiz",(req, res)=>{
  console.log("/API/updatestudentquiz: "+req.body);

  admin.auth().verifyIdToken(req.body.federatedAuthDecodedToken).then(
  () => {      
    let updateUserQuiz = "UPDATE user_quizzes SET answersjson = ? WHERE userquizzid = ?";
    db.query(updateUserQuiz, [req.body.answersjson, req.body.userquizzid], (err, result)=>{
      if (err) {
        console.log("error updating user quiz: ", err);
      }
      else {
        console.log("success");
      }
    });
    return
  }).catch((error)=>{
    //The auth token was forked (trying to by-pass user authentication for DDoS attack for example); 
    console.log("error: ", error)
    return
  });
})


app.post("/API/studentsquizzesforclassroom",(req, res)=>{

  const scoringMultipliers = { base: 10, easy: 5, hard: 15};

  admin.auth().verifyIdToken(req.body.federatedAuthDecodedToken).then(
  () => {
    let studentQuizzes = 
        "select usr.uid, usr.userjson->>'$.name' name, userjson->>'$.classrooms' classrooms,"+
        " qzs.answersjson, qzs.quiz_state, qzs.launchedquizid, qzs.quizjson"+
        " from users as usr"+
        " left join (select uqz.uid, uqz.answersjson, lqz.*"+
        " from user_quizzes uqz, launched_quizzes lqz"+
        " where uqz.launchedquizid = lqz.launchedquizid"+
        " and lqz.uniqueclassroomid = ?) as qzs"+
        " on qzs.uid = usr.uid"+
        " where usr.userjson->>'$.userType' = 'Student'"+
        " order by usr.userjson->>'$.name'";

    db.query(studentQuizzes, [req.body.globalQuizngagedId], (err, results)=>{
      if (err) {
        console.log("error querying users and launched quizzes: ", err);
      }
      else if (results.length == 0) {
        console.log("no students for globalQuizngagedId="+req.body.globalQuizngagedId);
      } 
      else {
        // left joined on launched quizzes that are in the classroom
        // this means there are students that didn't yet join a quiz in that classroom
        // but also that may not be in that classroom, so filter those out
        let studentResults = [];
        for (var i = 0; i < results.length; i++) {
          // presence of a student id in the request means only want that student's results
          if (results[i].answersjson != null && 
              (req.body.studentUID == null || results[i].uid == req.body.studentUID)) {

            quizJson = JSON.parse(results[i].quizjson);

            studentResults.push({
              uid: results[i].uid,
              name: results[i].name,
              quizTitle: quizJson.quizTitle,
              quizDescription: quizJson.eventDescription,
              numQuestions: scorer.countQuestions(quizJson),
              quizState: results[i].quiz_state,
              answersJson: scorer.analyseAnswersSet(results[i].answersjson, scoringMultipliers)
            });
          }
          else if (req.body.studentUID == null) {
            // for teacher's view return students that have not joined a quiz yet
            // test to see if they are in the classroom
            let parsedClassrooms = JSON.parse(results[i].classrooms);
            for (var j = 0; j < parsedClassrooms.length; j++) {
              let classroom = parsedClassrooms[j];
              if (classroom.globalQuizngagedId == req.body.globalQuizngagedId) {
                // is in the classroom, but not joined the quiz
                studentResults.push({
                  uid: results[i].uid,
                  name: results[i].name,
                });
                break;
              }
            }
          }
        }

        res.send({'studentResults': studentResults});
      }
    });
    return
  }).catch((error)=>{
    //The auth token was forked (trying to by-pass user authentication for DDoS attack for example); 
    console.log("error: ", error)
    return
  });
})


getOrInsertStudentAnswers = (studentUid, launchedquizid, callback) => {

  let studentQuery = "SELECT * FROM user_quizzes WHERE launchedquizid = ? AND uid = ?";
  db.query(studentQuery, [launchedquizid, studentUid], (err, result) => {
    if (err) {
      console.log("error selecting student answers, err: ", err);
      throw err;
    }
    else if (result.length == 0) {
      // no rows, so insert one, and return that via the callback
      let insertAnswers = "INSERT INTO user_quizzes (launchedquizid, uid, answersjson) VALUES (?, ?, '{}')";
      db.query(insertAnswers, [launchedquizid, studentUid], (err, result) => {
        if (err) {
          console.log("error inserting new student answers, err: ", err);
          throw err;
        }
        else {
          let studentQuery = "SELECT * FROM user_quizzes WHERE launchedquizid = ? AND uid = ?";
          db.query(studentQuery, [launchedquizid, studentUid], (err, result) => {
            if (err) {
              console.log("error selecting student answers, err: ", err);
              throw err;
            }
            else {
              callback({
                userquizzid: result[0].userquizzid,
                answersjson: result[0].answersjson,
              });
            }
          });
        }
      });
    }
    else if (result.length != 1) {
      console.log("error selecting student answers, too many rows ("+result.length+")", result);
      throw "too many student answers for "+studentUid;
    }
    else {
      // there was a single row at the start
      callback({
        userquizzid: result[0].userquizzid,
        answersjson: result[0].answersjson,
      });
    }
  });
}

// set port, listen for requests
const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
