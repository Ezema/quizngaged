import * as React from 'react';

import Box from '@mui/material/Box';

import Button from '@mui/material/Button';


import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';

import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
 

import CustomPaperReactComponent from '../customComponents/customPaperReactComponent.js';
import StyledFab from '../customComponents/styledFab.js';
import AddQuestion from '../customComponents/addQuestion.js'
import EditQuestion from '../customComponents/editQuestion.js'
import CustomTopNavBar from '../customComponents/customTopNavBar'

import 'firebase/compat/auth';

import LoadingScreen from '../customComponents/loadingScreen.js';

import backendQueryGetUserJSON from '../customFunctions/backendQueries/backendQueryGetUserJSON.js';
import backendQuerySaveUserJSON from '../customFunctions/backendQueries/backendQuerySaveUserJSON.js';
import DeleteDialog from '../customComponents/deleteDialog.js';

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
  const [statefulQuizngagedUserData, setStatefulQuizngagedUserData] = React.useState({});
  
  const [userIsStudent,setUserIsStudent] = React.useState(true)

  const [topBarTitle,setTopBarTitle] = React.useState("My Questions")

  const deleteQuestion = (ind)=> {
    
    let updatedList = listOfQuestions.filter( (el,ix)=> {
        return ix!=ind})
    
      for(let i= 0; i< updatedList.length; i++){
        updatedList[i].id = i
      }
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
      if(listOfQuestions.length > 0){
      let copyOfStatefulArray = JSON.parse(JSON.stringify(listOfQuestions));      
      
      setNewQuestionUID(parseInt(copyOfStatefulArray[copyOfStatefulArray.length-1].id) + 1 ) 
      } else {
        setNewQuestionUID(0);
      }
         
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
    }else{
      setStatefulUserObject(JSON.parse(localStorage.federatedAuthUserData))
      backendQueryGetUserJSON({callback:setStatefulQuizngagedUserData})
    }       

    if(JSON.parse(localStorage.quizngagedUserData).userType.localeCompare('Student')!=0){
      setUserIsStudent(false)
    }
    else{
      router.push('/my-classrooms')
    }
    if (editQuestionState==false){
      setTopBarTitle('My Questions')
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
                        <Button    size="large" onClick={(event)=>handleEditQuestionState(event,listOfQuestions.indexOf(question))} endIcon={<EditIcon />}>EDIT</Button>
                        <DeleteDialog dialogTitle = {"Delete Question?"} message="You will be deleting this question." deleteFunction={deleteQuestion} entityId={listOfQuestions.indexOf(question)}/>
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

