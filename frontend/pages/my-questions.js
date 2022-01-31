import * as React from 'react';
import Link from 'next/link'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import CustomPaperReactComponent from '../customComponents/customPaperReactComponent.js';
import StyledFab from '../customComponents/styledFab.js';
import AddQuestion from '../customComponents/addQuestion.js'
import EditQuestion from '../customComponents/editQuestion.js'
import CustomTopNavBar from '../customComponents/customTopNavBar'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseClientConfig from '../customGlobalVariables/firebaseClientConfig';

import Index from './index.js';
import LoadingScreen from '../customComponents/loadingScreen.js';
import globalUserIsAuthenticated from '../customGlobalVariables/userIsAuthenticated';

import backendQueryGetUserJSON from '../customFunctions/backendQueries/backendQueryGetUserJSON.js';


//this is hardcoded but will be fetched when the API is operative. When the API is defined, the subtitle will contain either a brief description or some piece of stat about the classroom like students joined  
const listOfQuestionsRetrieved = [{id:"1",questionType:'Multiple Choice',questionBaselineBody:"Mathematics 6th grade",questionBaselineAnswers:[{id:1,parentQuestionId:'1',body:'Physics'},{id:2,parentQuestionId:'1',body:'Maths'},{id:3,parentQuestionId:'1',body:'Arts'},{id:4,parentQuestionId:'1',body:'Literature'}],questionEasierBody:"Mathematics 6th grade",questionEasierAnswers:[{id:1,parentQuestionId:'1',body:'Physics'},{id:2,parentQuestionId:'1',body:'Maths'},{id:3,parentQuestionId:'1',body:'Arts'},{id:4,parentQuestionId:'1',body:'Literature'}],questionHarderBody:"Mathematics 6th grade",questionHarderAnswers:[{id:1,parentQuestionId:'1',body:'Physics'},{id:2,parentQuestionId:'1',body:'Maths'},{id:3,parentQuestionId:'1',body:'Arts'},{id:4,parentQuestionId:'1',body:'Literature'}]},{id:"2",questionType:'Text Response',questionBaselineBody:"Mathematics 6th grade",questionBaselineAnswers:[{id:1,parentQuestionId:'1',body:'Physics'},{id:2,parentQuestionId:'1',body:'Maths'},{id:3,parentQuestionId:'1',body:'Arts'},{id:4,parentQuestionId:'1',body:'Literature'}],questionEasierBody:"Mathematics 6th grade",questionEasierAnswers:[{id:1,parentQuestionId:'1',body:'Physics'},{id:2,parentQuestionId:'1',body:'Maths'},{id:3,parentQuestionId:'1',body:'Arts'},{id:4,parentQuestionId:'1',body:'Literature'}],questionHarderBody:"Mathematics 6th grade",questionHarderAnswers:[{id:1,parentQuestionId:'1',body:'Physics'},{id:2,parentQuestionId:'1',body:'Maths'},{id:3,parentQuestionId:'1',body:'Arts'},{id:4,parentQuestionId:'1',body:'Literature'}]}];

/* questionType
questionBaselineBody
questionBaselineAnswers
id
parentQuestionId
body
questionEasierBody
questionEasierAnswers
questionHarderBody
questionHarderAnswers */

/* id:null,            
questionType:null,
questionBaselineBody:null,
questionBaselineAnswers:[
    {   id:null,
        parentQuestionId:null,
        body:null */

export default function MyClassrooms(props) { 

  const [listOfQuestions,setListOfQuestions] = React.useState(null)
  const [newQuestionUID,setNewQuestionUID] = React.useState(null)
  const [addQuestionState,setAddQuestionState] = React.useState(false)  
  const [editQuestionState,setEditQuestionState] = React.useState(false)
  const [questionUIDToEdit,setQuestionUIDToEdit] = React.useState(null)
  const [questionToEdit,setQuestionToEdit] = React.useState(null) 
  const [questionIndexInQuestionsArray,setQuestionIndexInQuestionsArray]= React.useState(null) 
  
  const [statefulUserObject, setStatefulUserObject] = React.useState({});
  const [userIsAuthenticated,setUserIsAuthenticated] = React.useState(false)  
  const [authenticationAttemptFinished,setAuthenticationAttemptFinished] = React.useState(false)
  const [statefulQuizngagedUserData, setStatefulQuizngagedUserData] = React.useState({});
  

  const [topBarTitle,setTopBarTitle] = React.useState("My Questions")

  const handleAddQuestionState = ()=>{    
    if(!addQuestionState){
      let copyOfStatefulArray = JSON.parse(JSON.stringify(listOfQuestions));      
      setNewQuestionUID(parseInt(copyOfStatefulArray[copyOfStatefulArray.length-1].id) + 1 )    
      setAddQuestionState(true);
      setTopBarTitle("Add new question")
    }
    else{
      null
    }
    
    
  }  

  const handleEditQuestionState = (event,questionindexInArray)=>{    
    setEditQuestionState(true)
    setTopBarTitle("Edit question")
    console.log("handle edit: ",listOfQuestions)
    console.log("\n 2 handle edit: ",questionindexInArray)
    
    setQuestionUIDToEdit(listOfQuestions[questionindexInArray].id)        
    setQuestionIndexInQuestionsArray(questionindexInArray)
    
    setQuestionToEdit(listOfQuestions[questionindexInArray])
  }

  firebase.initializeApp(firebaseClientConfig);    
  firebase.app()
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      setStatefulUserObject(user)
    }
    if(firebase.auth().currentUser){
      globalUserIsAuthenticated.userIsAuthenticated = true  
      setUserIsAuthenticated(true)
      setAuthenticationAttemptFinished(true)                          
    }else{
        globalUserIsAuthenticated.userIsAuthenticated = false
        setUserIsAuthenticated(false)       
        setAuthenticationAttemptFinished(true)                 
    }
  })

  React.useEffect(()=>{
    backendQueryGetUserJSON({callback:setStatefulQuizngagedUserData})    
  },[])

  return (      
    (!globalUserIsAuthenticated.userIsAuthenticated && !userIsAuthenticated)?
    (      
      (authenticationAttemptFinished)?
      (           
        <Index></Index>          
      )
      :
      (
        <LoadingScreen></LoadingScreen>
      )      
    )
    :
    (      
      (statefulQuizngagedUserData.quizngagedUserData==undefined)?
      (
        <LoadingScreen></LoadingScreen>
      )
      :
      (!listOfQuestions)?
      (
        <div>
          
          {
          //due to the async nature of the setState function we need to include this
          setListOfQuestions(statefulQuizngagedUserData.quizngagedUserData.questions)
          }
          <LoadingScreen></LoadingScreen>
        </div>
      )
      :
      (        
        <div>          
          <CustomTopNavBar statefulUserObject={statefulUserObject} setStatefulUserObject={setStatefulUserObject} goBackIconState={addQuestionState || editQuestionState} addQuestionState={addQuestionState} setAddQuestionState={setAddQuestionState} editQuestionState={editQuestionState} setEditQuestionState={setEditQuestionState} topBarTitle={topBarTitle} setTopBarTitle={setTopBarTitle}></CustomTopNavBar>
          <Container>
            {addQuestionState?(
              <Box paddingTop="1em" paddingBottom="100px">
                <AddQuestion listOfQuestions={listOfQuestions} setListOfQuestions={setListOfQuestions} newQuestionUID={newQuestionUID} setAddQuestionState={setAddQuestionState}  ></AddQuestion>
              </Box>
            )
            :
            (editQuestionState)?        
            (
              <Box paddingTop="1em" paddingBottom="100px">
                <EditQuestion listOfQuestions={listOfQuestions} setListOfQuestions={setListOfQuestions} QuestionIndexInQuestionsArray={questionIndexInQuestionsArray} QuestionUIDToEdit={questionUIDToEdit} setEditQuestionState={setEditQuestionState} questionToEdit={questionToEdit}>

                </EditQuestion>
              </Box>
            )
            :
            (<Box paddingTop="1em" paddingBottom="100px">
              <Grid container spacing={2}>
                {
                  listOfQuestions.map((question)=>                 
                    <Grid item xs={12} md={6} lg={4} key={question.id}>              
                      <CustomPaperReactComponent elevation={3}>                  
                        <Typography variant='h6'>
                            #{question.id}
                          </Typography>
                        <Typography variant='subtitle1'>                    
                          {question.questionBaselineBody}
                        </Typography>
                        <Button size="small" onClick={(event)=>handleEditQuestionState(event,listOfQuestions.indexOf(question))}>EDIT</Button>
                      </CustomPaperReactComponent>
                    </Grid>      
                  )
                }
              </Grid>
            </Box>)}
          </Container>
          {addQuestionState?
          (<div></div>)
          :(editQuestionState)?
          (<div></div>)
          :(
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
              <Toolbar>          
                <StyledFab color="secondary" aria-label="add" onClick={(e)=>handleAddQuestionState()}>
                  <AddIcon />
                </StyledFab>          
              </Toolbar>
            </AppBar>
          )
          }
        </div>
      )
    )
  );
}

