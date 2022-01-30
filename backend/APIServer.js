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

// input: a teacher's user_id
// output: quizzes created by the teacher
app.post("/API/getquizzes",(req, res)=>{
    let sqlQuery = "select * from quizzes where teacher_user_id = ?";
    db.query(sqlQuery, [req.body.user.user_id], (err, result)=>{

        if (err) {
            console.error("Error while retrieving the teacher's quizzes: ", err.message);
            throw err;
          } 
        else {            
            res.send({'quizzes': result});
        }    
    });
});

// input: teacher's user_id,
//        quiz_type, quiz_title, quiz_topic
// output: quiz_id created
app.post("/API/createquiz",(req, res)=>{
  let sqlQuery = "insert into quizzes (teacher_user_id, quiz_type, quiz_title, quiz_topic, update_time) values (?, ?, ?, ?, now())";
  db.query(sqlQuery, [req.body.user.user_id, req.body.quiz_type, req.body.quiz_title, req.body.quiz_topic], (err, result)=>{

      if (err) {
          console.error("Error while inserting quiz: ", err.message);
          throw err;
        } 
      else {            
          res.send({'quiz_id': result.insertId});
      }    
  });
});

// input: quiz_id,
//        quiz_type, quiz_title, quiz_topic
// output: operationSuccess true
app.post("/API/updatequiz",(req, res)=>{
    let sqlQuery = "update quizzes set quiz_type=?, quiz_title=?, quiz_topic=?, update_time=now() where quiz_id=?";
    db.query(sqlQuery, [req.body.quiz_type, req.body.quiz_title, req.body.quiz_topic, req.body.quiz_id], (err, result)=>{

        if (err) {
            console.error("Error while updating quiz: ", err.message);
            throw err;
          } 
        else {            
            res.send({'operationSuccess': true});
        }    
    });
});

// input: quiz_id
// output: operationSuccess true
app.post("/API/deletequiz",(req, res)=>{
    let sqlQuery = "delete from quizzes where quiz_id=?";
    db.query(sqlQuery, [req.body.quiz_id], (err, result)=>{

        if (err) {
            console.error("Error while deleting quiz: ", err.message);
            throw err;
        } 
        else {
            // also deletes the associated questions
            let sqlQuery2 = "delete from quiz_questions where quiz_id=?";
            db.query(sqlQuery2, [req.body.quiz_id], (err2, result2)=>{
          
                if (err2) {
                    console.error("Error while deleting quiz questions: ", err2.message);
                    throw err2;
                } 
                else {
                    res.send({'operationSuccess': true});
                }    
            });
        }    
    });
});

// input: quiz_id
// output: list of quiz questions containing lists of answers
app.post("/API/getquizquestions",(req, res)=>{
    let questionsQuery = "select * from questions where question_id in (select question_id from quiz_questions where quiz_id = ?)";
    db.query(questionsQuery, [req.body.quiz_id], (err, result)=>{

        if (err) {
            console.error("Error while selecting questions: ", err.message);
            throw err;
        } 
        else {
            let answersQuery = "select * from question_answers where question_id = ? order by display_order";
            for (var i = 0; i < result.length; i++) {
                db.query(answersQuery, [result[i].question_id], (err2, result2)=>{
            
                    if (err2) {
                        console.error("Error while deleting quiz questions: ", err2.message);
                        throw err2;
                    } 
                    else {
                        result[i].answers = result2;
                    }
                });
            }

            res.send({'questions': result});
        }    
    });
});

// input: mandatory: quiz_id, question_text, question_type, difficulty_level
//        optional: variant_for_question_id, correct_answer_id, correct_sort_or_pairs, time_limit_seconds, assigned_score
// output: question_id created
app.post("/API/createquestion", (req, res)=>{
    let insertQuestion = "insert into questions (question_text, question_type, difficulty_level, "+
        " variant_for_question_id, correct_answer_id, correct_sort_or_pairs, time_limit_seconds, assigned_score) "+
        "values (?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(insertQuestion, [req.body.question_text, req.body.question_type, req.body.difficulty_level, req.body.variant_for_question_id, 
        req.body.correct_answer_id, req.body.correct_sort_or_pairs, req.body.time_limit_seconds, req.body.assigned_score], (err, result)=>{

        if (err) {
            console.error("Error while inserting question: ", err.message);
            throw err;
        } 
        else {
            let question_id = result.insertId;
            let insertQuizQuestion = "insert into quiz_questions (quiz_id, question_id) values (?, ?)";
            db.query(insertQuizQuestion, [req.body.quiz_id, question_id], (err2, result2) => {
                if (err2) {
                    console.error("Error while inserting quiz question: ", err2.message);
                    throw err2;
                }
                else {
                    res.send({'question_id': question_id});
                }
            });
        }
    });
});

// input: mandatory: question_id, question_text, question_type, difficulty_level
//        optional: variant_for_question_id, correct_answer_id, correct_sort_or_pairs, time_limit_seconds, assigned_score
// output: operationSuccess true
app.post("/API/updatequestion", (req, res)=>{
  let updateQuestion = "update questions set question_text = ?, question_type = ?, difficulty_level = ?, "+
      " variant_for_question_id = ?, correct_answer_id = ?, correct_sort_or_pairs = ?, time_limit_seconds = ?, assigned_score = ?"+
      " where question_id = ?";

  db.query(updateQuestion, [req.body.question_text, req.body.question_type, req.body.difficulty_level, req.body.variant_for_question_id, 
      req.body.correct_answer_id, req.body.correct_sort_or_pairs, req.body.time_limit_seconds, req.body.assigned_score, req.body.question_id], (err, result)=>{

      if (err) {
          console.error("Error while updating question: ", err.message);
          throw err;
      } 
      else {
          res.send({'operationSuccess': true});
      }
  });
});

// input: question_id
// output: operationSuccess true
app.post("/API/deletequestion", (req, res)=>{
    let deleteQuizQuestions = "delete from quiz_questions where question_id = ?";
    db.query(deleteQuizQuestions, [req.body.question_id], (err, result)=>{

        if (err) {
            console.error("Error while deleting quiz_question: ", err.message);
            throw err;
        } 
        else {
            let deleteAnswers = "delete from question_answers where question_id = ?";
            db.query(deleteAnswers, [req.body.question_id], (err2, result)=>{
          
                if (err) {
                    console.error("Error while deleting question_answers: ", err2.message);
                    throw err;
                } 
                else {
                    let deleteQuestion = "delete from questions where question_id = ?";
                    db.query(deleteQuestion, [req.body.question_id], (err3, result2)=>{
                  
                        if (err) {
                            console.error("Error while deleting question: ", err3.message);
                            throw err;
                        } 
                        else {
                            res.send({'operationSuccess': true});
                        }
                    });
                }
            });
        }
    });
});

// input: question_id, list of answer_text in correct display order
//        note: any previous answers will be removed and replaced by the new list this is then used 
//        by the caller to update the question columns: correct_answer_id or correct_sort_or_pairs
// output: list of answer ids, corresponding to the order input
app.post("/API/updatequestionanswers", (req, res)=>{
    let deleteSql = "delete from question_answers where question_id = ?";
    db.query(deleteSql, [req.body.question_id], (err, result)=>{

        if (err) {
            console.error("Error while deleting question_answers: ", err.message);
            throw err;
        } 
        else {
            let answerIds = [];
            let insertSql = "insert into question_answers (question_id, display_order, answer_text) values (?, ?, ?)";

            for (var i = 0; i < req.body.answer_texts.length; i++) {
                db.query(insertSql, [req.body.question_id, i, req.body.answer_texts[i]], (err2, result2) => {

                    if (err) {
                        console.error("Error while inserting question_answers: ", err2.message);
                        throw err2;
                    }
                    else {
                        answerIds.push(result2.insertId);
                    }
                });
            }
            res.send({'answerIds': answerIds});
        }
    });
});


// set port, listen for requests
const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
