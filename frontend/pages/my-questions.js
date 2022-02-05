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
import DeleteIcon from '@mui/icons-material/Delete';
 

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
import backendQuerySaveUserJSON from '../customFunctions/backendQueries/backendQuerySaveUserJSON.js';

import { useRouter } from 'next/router'

export default function MyClassrooms(props) { 

  const router = useRouter()

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
  
  const [userIsStudent,setUserIsStudent] = React.useState(true)

  const [topBarTitle,setTopBarTitle] = React.useState("My Questions")

  const deleteQuestion = ( ev, ind)=> {
    
    let updatedList = listOfQuestions.filter( (el,ix)=> {
        return ix!=ind})
    
      setListOfQuestions(updatedList)
    
      //create a copy from localstorage
      let copyOfQuizngagedUserData = JSON.parse(localStorage.quizngagedUserData)
      //save the edited questions in the copy
      copyOfQuizngagedUserData.questions = updatedList
      //replace the old data with the new data in localstorage
      localStorage.setItem('quizngagedUserData',JSON.stringify(copyOfQuizngagedUserData))
      // sync with backend
      backendQuerySaveUserJSON(()=>{})
    
  }

  const handleAddQuestionState = ( )=>{    
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
    
    setQuestionUIDToEdit(listOfQuestions[questionindexInArray].id)        
    setQuestionIndexInQuestionsArray(questionindexInArray)
    
    setQuestionToEdit(listOfQuestions[questionindexInArray])
  }

  React.useEffect(()=>{
    if(window.location.pathname.localeCompare("/my-questions")!=0){
      window.location.pathname = "/my-questions"
    }
    if((localStorage.federatedAuthUserData)==null || localStorage.federatedAuthUserData==undefined){
      router.push('/')
    }/* else if(localStorage.quizngagedUserData==null || localStorage.quizngagedUserData==undefined){
      router.push('/')
    } */else{
      setStatefulUserObject(JSON.parse(localStorage.federatedAuthUserData))
      backendQueryGetUserJSON({callback:setStatefulQuizngagedUserData})
    }       

    if(JSON.parse(localStorage.quizngagedUserData).userType.localeCompare('Student')!=0){
      setUserIsStudent(false)
    }
    else{
      router.push('/my-classrooms')
    }

  },[addQuestionState, editQuestionState])  

  return (    
      (statefulQuizngagedUserData.questions==undefined || userIsStudent==true)?
      (
        <div>       
          <LoadingScreen></LoadingScreen>
        </div>
      )
      :
      (!listOfQuestions)?
      (
        <div>
        {setListOfQuestions(statefulQuizngagedUserData.questions)}
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
                        <Button    size="small" onClick={(event)=>handleEditQuestionState(event,listOfQuestions.indexOf(question))}>EDIT</Button>
                        
                         <Button  size="small" color="error" endIcon={<DeleteIcon />}
                         onClick={(event)=>deleteQuestion(event, listOfQuestions.indexOf(question))}>
                            Delete
                          </Button>
                       
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
  );
}

