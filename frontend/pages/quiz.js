import * as React from 'react';

/* mui libraries */
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import LoadingScreen from '../customComponents/loadingScreen.js'

/* firebase */
import 'firebase/compat/auth';

/* router */
import { useRouter } from 'next/router'

/* configuration */
import { BASEPATH, quizDummy }  from '../config.js'


/* custom components */
import CustomTopNavBar from '../customComponents/customTopNavBar'
import backendQueryGetUserJSON from '../customFunctions/backendQueries/backendQueryGetUserJSON.js';
import  RunQuiz   from '../customComponents/runQuiz.js'
import backendQueryGetQuiz from '../customFunctions/backendQueries/backendQueryGetQuiz.js';
import backendUpdateQuizAnswers from '../customFunctions/backendQueries/backendUpdateQuizAnswers.js';

export default function Quiz() {

  const router = useRouter()

  var quizData = {}
  const [dataLoaded, setDataLoaded] =  React.useState({})
  const [quiz, setQuiz] =  React.useState({})
  const [studentAnswers, setStudentAnswers] =  React.useState([])
  
  // state holding current view
  // 1 - show quiz overview
  // 2 - quiz questions
  // 3 - questions overview (submit screen)
  // 4 - quiz submited
  var initialState = {
    currentScreen: 1,
    currentQuestionInd: 0,
    currentDifficulty: 'base', //'base', 'easy', 'hard'
    
  }
  const [state, setState] =  React.useState(initialState)

  const [tempPreviousAnswers, setTempPrevAnswers] = React.useState({}); // Mihail, this is only here for testing until you can use the previous answers 

  const fetchData = async () => {
    var urlParams = new URLSearchParams(window.location.search);
    var qid = parseInt(urlParams.get('id'));
    try{
      backendQueryGetQuiz(qid, {callback: (quizResult, previousAnswers) => {
          if (quizResult.launchedquizid == qid) {
            parseQuizData(quizResult);
            console.log("quiz.js - backendQueryGetQuiz: returned student answers: ", previousAnswers);
            setTempPrevAnswers({userquizzid: previousAnswers.userquizzid, answersjson: previousAnswers.answersjson});
          }
          else {
            console.log("quiz id returned invalid");
            loadDummyData();
          }
        }
      });

    } catch (err) {
      // fall back to dummy data if we have an error while retrieving data from server (it is not implemented yet)
      console.log('issue with fetching quiz data')
      loadDummyData();
    }
  }

  const loadDummyData = async () => {
    console.log('loading dummy data')
    quizData = await quizDummy
    setQuiz(quizData)
    setDataLoaded(true)
  }


  const parseQuizData = (quiz) => {
    try{
      let parsedJson = JSON.parse(quiz.quizjson);
      quizData = {
        "id": parsedJson.launchedquizid,
        "isDeleted": false,
        "quizTitle": parsedJson.quizTitle,
        "quizTopic": parsedJson.quizTopic,
        "questions": parsedJson.questions,
      };
      console.log("formatted data=", quizData);
      setQuiz(quizData);
      setDataLoaded(true);

    } catch (err) {
      // fall back to dummy data if we have an error while retrieving data from server (it is not implemented yet)
      console.log('issue with fetched quiz data')
      loadDummyData();
    }
  }

  const formatQuestions = (quiz) => {
    console.log("formatQuestions: parse the quiz data and put the questions in place", quiz);
    var questions = [quiz.askQuestions[0]];

    return questions;
  }

  /* data required to render  TOP barNOt sure if we need top bar on the quiz page*/
  const [launchClassroomQuizState,setLaunchClassroomQuizState] = React.useState(false)
  const [viewClassroomResultsState,setViewClassroomResultsState] = React.useState(false)
  const [viewClassroomStatisticsState,setViewClassroomStatisticsState] = React.useState(false)
  const [viewClassroomOngoingQuizzesState,setViewClassroomOngoingQuizzesState] = React.useState(false)
  const [statefulUserObject, setStatefulUserObject] = React.useState({});
  const [topBarTitle,setTopBarTitle] = React.useState("Quiz")
  const [userIsStudent,setUserIsStudent] = React.useState(true)
  const [canRender,setCanRender] = React.useState(false)

  
  // load question data
  React.useEffect(() => {
    
    fetchData()
  }, [])

  const updateAnswers =  (qId, qType, curAnswer) => {
    // find question data
    var questionData = quiz.questions.find( item => item.id ==qId)  
        
    var newAnswer = {  qid:qId,
                        difficulty:state.currentDifficulty,
                        qtype:qType,
                        studentanswer:curAnswer,
                        questiondata:questionData
                      }
    // remove  previous answer to the question if any
    var filteredAnswers = studentAnswers.filter( item =>item.qid != qId)
    filteredAnswers.push(newAnswer)
   
    setStudentAnswers(filteredAnswers)
    
  }

  const sendQuizToServer = async () =>{
   
    let newAnswer = JSON.stringify(studentAnswers);
    backendUpdateQuizAnswers(tempPreviousAnswers.userquizzid, newAnswer);


    let quizSubmitted = true
    // Mihail, I left this code doing nothing:... I guess it should return a response...

  //    let quizSubmitted = false

  //   let uid = JSON.parse(localStorage.quizngagedUserData).uid;
    
  //     const quizResponse = await fetch(BASEPATH+'submitquiz',
  //     {
  //       method: 'POST', 
  //       headers: {
  //        'Content-Type': 'application/json'
  //        },
  //        body: JSON.stringify({answers:studentAnswers,studentid:uid,qid:1}) 
  //     })
  //     quizSubmitted = await quizResponse.json()
  //  try{ } catch (err) {
  //     // fall back to default data
  //     console.log('issue while submitting exam data')
  //   }
       
  }
  
 
  /* logic to make sure user is logged in*/
  React.useEffect(()=>{
    if(window.location.pathname.localeCompare("/quiz")!=0){
      window.location.pathname = "/quiz"
    }
    
    if((localStorage.federatedAuthUserData)==null || localStorage.federatedAuthUserData==undefined){
      router.push('/')
    }else{

      if(localStorage.quizngagedUserData==undefined){
        setStatefulUserObject(JSON.parse(localStorage.federatedAuthUserData))
        backendQueryGetUserJSON({callback:()=>{}})
        console.log("before JSON.parse(localStorage.quizngagedUserData)",JSON.parse(localStorage.quizngagedUserData))
      }else{        
        if(JSON.parse(localStorage.quizngagedUserData).classrooms){
          setCanRender(true)
          if(JSON.parse(localStorage.quizngagedUserData).userType.localeCompare('Student')!=0){
            setUserIsStudent(false)
          }
        }        
      }   
    }        
    
  },[statefulUserObject,userIsStudent])

  
  if(!canRender || !dataLoaded ){
    return <div>        
             <LoadingScreen></LoadingScreen>
            </div>
  } else {
    // data is loaded we can render component
    return <>        
             <CustomTopNavBar 
                  statefulUserObject={statefulUserObject} 
                  setStatefulUserObject={setStatefulUserObject} 
                  topBarTitle={topBarTitle} 
                  setTopBarTitle={setTopBarTitle}
                  viewClassroomStatisticsState={viewClassroomStatisticsState} 
                  setViewClassroomStatisticsState={setViewClassroomStatisticsState}
                  viewClassroomResultsState={viewClassroomResultsState} 
                  setViewClassroomResultsState={setViewClassroomResultsState} 
                  launchClassroomQuizState={launchClassroomQuizState} 
                  setLaunchClassroomQuizState={setLaunchClassroomQuizState} 
                  viewClassroomOngoingQuizzesState={viewClassroomOngoingQuizzesState}
                  setViewClassroomOngoingQuizzesState={setViewClassroomOngoingQuizzesState}
                  goBackIconState={  viewClassroomStatisticsState || viewClassroomResultsState || launchClassroomQuizState || viewClassroomOngoingQuizzesState}>
              </CustomTopNavBar>
              <Container>
                <Box paddingTop="1em">
                  <RunQuiz 
                    state={state}
                    setState = {setState}
                    quiz = {quiz}
                    setQuiz = {setQuiz}
                    updateAnswers = {updateAnswers}
                    sendQuizToServer = {sendQuizToServer}
                   
                   
                  ></RunQuiz>
                </Box>
              </Container>
           </>
  }
}

