const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const scorer = require('./customFunctions/answersScoring.js')


/// ********* Authentication functionality *********
let admin = require("firebase-admin");
let serviceAccount = require("./secret-key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

/// ********* Connect to the Mysql DB running in docker *********
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "appdb",  
});

/// ********* Set up the connection ************
// connect to database and lazily create the tables needed by the application
// if successful the db object is made available globally
db.connect((err) => {
  if (err) {
    console.log("The docker DB is not running!");
    throw err;
  } else {
    console.log("Connected to database");
    let createUsers = "CREATE TABLE IF NOT EXISTS users (uid VARCHAR(50),userjson json);"
    let createClassrooms = "CREATE TABLE IF NOT EXISTS classrooms (uniqueclassroomid INT UNSIGNED NOT NULL AUTO_INCREMENT,classroomjson json,classroomowneruid VARCHAR(50), PRIMARY KEY(uniqueclassroomid));"
    let createLaunchedQuizzes = "CREATE TABLE IF NOT EXISTS launched_quizzes (launchedquizid INT UNSIGNED NOT NULL AUTO_INCREMENT,uniqueclassroomid INT UNSIGNED NOT NULL, quiz_state ENUM('IN_PROGRESS', 'IN_REVIEW', 'REVIEWED') NOT NULL, quizjson json, PRIMARY KEY(launchedquizid));"
    let createUserQuizzes = "CREATE TABLE IF NOT EXISTS user_quizzes (userquizzid INT UNSIGNED NOT NULL AUTO_INCREMENT,launchedquizid INT UNSIGNED NOT NULL,uid VARCHAR(50), answersjson json, PRIMARY KEY(userquizzid));"
    db.query(createUsers,(err,result) => {
      if (err) {
        console.log("error creating users", err);
        throw err;
      }
    });
    db.query(createClassrooms,(err,result) => {
      if (err) {
        console.log("error creating classrooms", err);
        throw err;
      }
    });
    db.query(createLaunchedQuizzes,(err,result) => {
      if (err) {
        console.log("error creating launched quizzes", err);
        throw err;
      }
    });
    db.query(createUserQuizzes,(err,result) => {
      if (err) {
        console.log("error creating user quizzes", err);
        throw err;
      }
    });
    console.log("db initialized");
  }  
});

global.db = db;
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

/// ********** API routing *************

// gets the user JSON object
// input: the user's unique uid
// output: the JSON object containing the user's data
app.post("/API/getuserJSON",(req, res) => {    
    
  //validate user UID received in the HTTP request
  admin.auth().verifyIdToken(req.body.federatedAuthDecodedToken).then(
  () => {
    let sqlQuery = 'SELECT userjson FROM users WHERE uid = ?';

    db.query(sqlQuery, [req.body.uid], (err, result) => {
      if (err) {
        console.log("error with db query", err);
        throw err;
      } 
      else {                    
        console.log("\nthe retrieved userjson: ", result[0].userjson);
        res.send({"userjson":result[0]});
      }    
    });
    return;
  }).catch((error) => {
    // an unexpected error occurred
    console.log("error: ", error);
    return;
  });    
});

// saves the user JSON object
// input: the user's unique uid,
//        the JSON object containing the user's data
// output: JSON response object with "operationSuccessful" true if success
app.post("/API/saveuserJSON",(req, res) => {
    
  //validate user UID received in the HTTP request
  console.log("/API/saveuserJSON: ", new Date())

  admin.auth().verifyIdToken(req.body.federatedAuthDecodedToken).then(
  () => {      
    let sqlQuery = 'SELECT userjson FROM users WHERE uid = ?';

    db.query(sqlQuery, [req.body.uid], (err, result) => {
      if (err) {
        console.log("error with db query", err);
        throw err;
      } 
      else if (result.length == 0) {
        // if none found, the user is new, insert a new row         
        let sqlQuery = 'INSERT INTO users (uid, userjson) VALUES (?, ?)';
        db.query(sqlQuery, [req.body.uid, req.body.userjson], (err, result) => {
          if (err) {
            console.log("error with db insert", err);
            res.send({'operationSuccessful':false});
          } else {
            console.log("\nthe saved userjson: ", req.body.userjson)
            res.send({'operationSuccessful':true});
          }
        });                                              
      } else {
        // user exists already, update the row
        let sqlQuery = 'UPDATE users SET userjson = ? WHERE uid = ?';
        db.query(sqlQuery, [req.body.userjson, req.body.uid], (err, result) => {
          if (err) {                                
            console.log("error with db update", err);
            res.send({'operationSuccessful':false});
          } else {
            console.log("\nthe saved userjson: ", req.body.userjson);                  
            res.send({'operationSuccessful':true});
          }
        });
      }    
    });
    return
  }).catch((error) => {
    // an unexpected error occurred
    console.log("error: ", error);
    res.send({'operationSuccessful':false});
    return;
  });
})

// validate the user's account
// input: the user's unique uid,
// output: JSON response object with "hasAccount" true if found
app.post("/API/checkuserhasaccount",(req, res) => {

  //validate user UID received in the HTTP request
  admin.auth().verifyIdToken(req.body.federatedAuthDecodedToken).then(
  () => {
    let sqlQuery = 'SELECT * FROM users WHERE uid = ?';
    db.query(sqlQuery, [req.body.uid], (err, result) => {
      if (err) {
        console.log("error with db query", err);
        throw err;
      } else {                        
        res.send({"hasAccount":result.length != 0})
      }
    });
    return
  }).catch((error) => {
    // an unexpected error occurred
    console.log("error: ", error);
    return;
  });
});

// save a new classroom
// input: the user's unique uid,
//        the classroom JSON object
// output: JSON response object with "globalUniqueID" primary key of the inserted classroom
app.post("/API/savenewuniqueclassroom",(req, res) => {
  console.log("/API/savenewuniqueclassroom: ")

  admin.auth().verifyIdToken(req.body.federatedAuthDecodedToken).then(
  () => {      
    let sqlQuery = 'INSERT INTO classrooms (classroomjson, classroomowneruid) VALUES (?, ?)';

    db.query(sqlQuery, [req.body.classroomjson, req.body.uid], (err, result) => {
      if (err) {                  
        console.log("error with db query", err);
        throw err;
      } 
      else { 
        res.send({'globalUniqueID':result.insertId});
      }    
    });
    return;
  }).catch((error) => {
    // an unexpected error occurred
    console.log("error: ", error);
    return;
  });
})

// save changes to an existing classroom
// input: the classroom unique classroom id,
//        the classroom JSON object
// output: JSON response object with "globalUniqueID" primary key of the updated classroom
app.post("/API/updateuniqueclassroom",(req, res) => {
  console.log("/API/updateuniqueclassroom: ")

  admin.auth().verifyIdToken(req.body.federatedAuthDecodedToken).then(
  () => {      
    let sqlQuery = 'UPDATE classrooms SET classroomjson = ? WHERE uniqueclassroomid = ?';

    db.query(sqlQuery, [req.body.classroomjson, req.body.uniqueclassroomid], (err, result) => {
      if (err) {
        console.log("error with db query", err);
        throw err;
      } 
      else { 
        res.send({'globalUniqueID':result.insertId});
      }    
    });
    return;
  }).catch((error) => {
    // an unexpected error occurred
    console.log("error: ", error);
    return;
  });
})

// validate a classroom exists and return the valid data
// input: the classroom unique id
// output: JSON response object with "uniqueClassroomIDValidity" true if valid, plus the classroom data 
app.post("/API/checkclassroomuniqueidisvalid",(req, res) => {
  console.log("/API/checkclassroomuniqueidisvalid: ")

  admin.auth().verifyIdToken(req.body.federatedAuthDecodedToken).then(
  () => {      
    let sqlQuery ='SELECT * FROM classrooms WHERE uniqueclassroomid = ?'
    db.query(sqlQuery, [req.body.classroomUniqueId], (err, result) => {
      if (err) {
        console.log("error with db query", err);
        throw err;
      } 
      else if (result.length == 0) {
        res.send({'uniqueClassroomIDValidity':false});
      } else {
        res.send({
          'uniqueClassroomIDValidity':true,
          'classroomjson':result[0].classroomjson,
          'uniqueclassroomid':result[0].uniqueclassroomid,
          'classroomowneruid':result[0].classroomowneruid
        });
      }
    });
    return;
  }).catch((error) => {
    // an unexpected error occurred
    console.log("error: ", error);
    res.send({'uniqueClassroomIDValidity':false});
    return;
  });
});

// returns the list of live (ongoing) quizzes for a classroom
// input: the classroom unique id
// output: JSON response object with "uniqueClassroomIDValidity" true if valid, plus classroom data and the list of quizzes
app.post("/API/addlivequizzesforclassroom",(req, res) => {
  console.log("/API/addlivequizzesforclassroom: ")

  admin.auth().verifyIdToken(req.body.federatedAuthDecodedToken).then(
  () => {
    // test for the classroom is valid (it should be)
    let sqlQuery ="SELECT * FROM classrooms WHERE uniqueclassroomid = ?";
    db.query(sqlQuery, [req.body.classroomUniqueId], (err, result) => {
      if (err) {
        console.log("error with db query", err);
        throw err;
      } 
      else if (result.length == 0) {
        // should never happen
        res.send({'uniqueClassroomIDValidity':false})
      } else {
        // query all ongoing and completed quizzes for the classroom, the results will 
        // be added to the list and returned in the response JSON object
        let launchQuizQuery = "SELECT * FROM launched_quizzes WHERE uniqueclassroomid = ?";
        let ongoingQuizzes = [];

        db.query(launchQuizQuery, [req.body.classroomUniqueId], (err, resultQuizzes) => {
          if (err) {
            console.log("error querying launched quizzes: ", err);
            throw err;
          } else {
            // add each launched quiz the results
            for (var i = 0; i < resultQuizzes.length; i++) {
              ongoingQuizzes.push({
                launchedquizid: resultQuizzes[i].launchedquizid,
                uniqueclassroomid: resultQuizzes[i].uniqueclassroomid,
                quiz_state: resultQuizzes[i].quiz_state,
                quizjson: resultQuizzes[i].quizjson,
              });
            } 
            res.send({
              'uniqueClassroomIDValidity':true,
              'classroomjson':result[0].classroomjson,
              'uniqueclassroomid':result[0].uniqueclassroomid,
              'classroomowneruid':result[0].classroomowneruid, 
              'ongoingQuizzes':ongoingQuizzes
            });
          }
        });
      }
    });
    return;
  }).catch((error) => {
    //The auth token was forked (trying to by-pass user authentication for DDoS attack for example); 
    console.log("error: ", error);
    res.send({'uniqueClassroomIDValidity':false});
    return;
  });
})

// launch the quiz: this means take a snapshot of the quiz at this moment in time and save it with the state IN PROGRESS
// input: the classroom unique id, 
//        the quiz JSON object
// output: none
app.post("/API/launchquiz",(req, res) => {
  console.log("\n/API/launchquiz: "+req.body);

  admin.auth().verifyIdToken(req.body.federatedAuthDecodedToken).then(
  () => {      
    let insertQuery ="INSERT INTO launched_quizzes (uniqueclassroomid, quiz_state, quizjson) VALUES (?, 'IN_PROGRESS', ?)";
    db.query(insertQuery, [req.body.uniqueclassroomid, req.body.quizJson], (err, result) => {
      if (err) {
        console.log("error inserting launched quiz", err); 
      } 
      else {
        console.log("inserted launched quiz, id="+result.insertId);
      }
    });
    return;
  }).catch((error) => {
    // an unexpected error occurred
    console.log("error: ", error);
    return;
  });
})

// add a student to an ongoing quiz
// input: the launched quiz unique id, 
//        the student's UID
// output: a JSON object containing all the quiz data
app.post("/API/studentjoinquiz",(req, res) => {
  console.log("/API/studentjoinquiz: "+req.body);

  admin.auth().verifyIdToken(req.body.federatedAuthDecodedToken).then(
  () => {      
    let launchQuizQuery = "SELECT * FROM launched_quizzes WHERE launchedquizid = ?";
    db.query(launchQuizQuery, [req.body.quizId], (err, resultQuizzes) => {
      if (err) {
        console.log("error querying launched quizzes: ", err);
        throw err;
      }
      else if (resultQuizzes.length == 0) {
        // belt and braces, should never happen as the function is expected to be called with a valid quiz id
        console.log("error querying launched quizzes: no quiz found for id="+req.body.quizId);
      } 
      else {
        // call a function to handle the possible need to insert new answers and query the results
        // provide a callback to return the data in the response, 
        // note: the selects/inserts happen asynchonously 
        getOrInsertStudentAnswers(req.body.uid, resultQuizzes[0].launchedquizid, (answers) => {
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
  }).catch((error) => {
    // an unexpected error occurred
    console.log("error: ", error)
    return
  });
})

// update a student's answers to an ongoing quiz (either they are being saved between answers or the student has made another attempt)
// input: the unique id of the student's own launched quiz attempt
// output: none
app.post("/API/updatestudentquiz",(req, res) => {
  console.log("/API/updatestudentquiz: ");

  admin.auth().verifyIdToken(req.body.federatedAuthDecodedToken).then(
  () => {      
    let updateUserQuiz = "UPDATE user_quizzes SET answersjson = ? WHERE userquizzid = ?";
    db.query(updateUserQuiz, [req.body.answersjson, req.body.userquizzid], (err, result) => {
      if (err) {
        console.log("error updating user quiz: ", err);
      }
      else {
        console.log("success");
      }
    });
    return
  }).catch((error) => {
    // an unexpected error occurred
    console.log("error: ", error);
    return;
  });
})


// returns all the students and quizzes data for the classroom for display in the view results page
// input: the classroom unique id,
//        optionally a single student's unique UID (only present when the student is querying their own results)
// output: summary of the quiz, plus all the data for each student and quiz, including scoring achieved
//        Note: the scoring happens in real time here
app.post("/API/studentsquizzesforclassroom",(req, res) => {

  // default scoring parameters (these can be superseded later when scores are input by the teacher)
  const scoringMultipliers = { base: 10, easy: 5, hard: 15};

  admin.auth().verifyIdToken(req.body.federatedAuthDecodedToken).then(
  () => {
    // the SQL is complex, there is a left join on users so that every student in the classroom
    // is represented in the output even if they have not yet taken part in an ongoing quiz
    // (later the teacher can have an option to include/exclude those from the view)
    // the right side of the join is an inner select that joins the user and launched quizzes,
    // this is necessary for the above left join to work correctly
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

    db.query(studentQuizzes, [req.body.globalQuizngagedId], (err, results) => {
      if (err) {
        console.log("error querying users and launched quizzes: ", err);
        throw err;
      }
      else if (results.length == 0) {
        // it is a valid condition that the classroom has no students/ongoing quizzes
        console.log("no students for globalQuizngagedId="+req.body.globalQuizngagedId);
      } 
      else {
        // left joined on launched quizzes that are in the classroom
        // this means there are students that didn't yet join a quiz in that classroom
        // but also that may not be in that classroom, so filter those out
        let studentResults = [];
        for (var i = 0; i < results.length; i++) {
          // presence of a student id in the request means only return that student's results
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
  }).catch((error) => {
    // an unexpected error occurred
    console.log("error: ", error);
    return;
  });
})

// function to handle the possible need to insert new answers and query the results
// input: the launched quiz unique id, 
//        the student's UID
// the results are returned in the callback function
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
      // should never happen, throw an error for the caller to handle
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
