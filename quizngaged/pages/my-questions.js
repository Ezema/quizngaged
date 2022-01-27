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


//this is hardcoded but will be fetched when the API is operative. When the API is defined, the subtitle will contain either a brief description or some piece of stat about the classroom like students joined  
const listOfQuestionsRetrieved = [{id:"1",questionType:'Multiple Choice',baselineQuestion:"Mathematics 6th grade",baselineQuestionAnswers:[{id:1,parentQuestionId:'1',body:'Physics'},{id:2,parentQuestionId:'1',body:'Maths'},{id:3,parentQuestionId:'1',body:'Arts'},{id:4,parentQuestionId:'1',body:'Literature'}],easierQuestion:"Mathematics 6th grade",easierQuestionAnswers:[{id:1,parentQuestionId:'1',body:'Physics'},{id:2,parentQuestionId:'1',body:'Maths'},{id:3,parentQuestionId:'1',body:'Arts'},{id:4,parentQuestionId:'1',body:'Literature'}],harderQuestion:"Mathematics 6th grade",harderQuestionAnswers:[{id:1,parentQuestionId:'1',body:'Physics'},{id:2,parentQuestionId:'1',body:'Maths'},{id:3,parentQuestionId:'1',body:'Arts'},{id:4,parentQuestionId:'1',body:'Literature'}]},{id:"2",questionType:'Text Response',baselineQuestion:"Mathematics 6th grade",baselineQuestionAnswers:[{id:1,parentQuestionId:'1',body:'Physics'},{id:2,parentQuestionId:'1',body:'Maths'},{id:3,parentQuestionId:'1',body:'Arts'},{id:4,parentQuestionId:'1',body:'Literature'}],easierQuestion:"Mathematics 6th grade",easierQuestionAnswers:[{id:1,parentQuestionId:'1',body:'Physics'},{id:2,parentQuestionId:'1',body:'Maths'},{id:3,parentQuestionId:'1',body:'Arts'},{id:4,parentQuestionId:'1',body:'Literature'}],harderQuestion:"Mathematics 6th grade",harderQuestionAnswers:[{id:1,parentQuestionId:'1',body:'Physics'},{id:2,parentQuestionId:'1',body:'Maths'},{id:3,parentQuestionId:'1',body:'Arts'},{id:4,parentQuestionId:'1',body:'Literature'}]}];

export default function MyClassrooms(props) { 

  const [listOfQuestions,setListOfQuestions] = React.useState(listOfQuestionsRetrieved)

  const [newQuestionUID,setNewQuestionUID] = React.useState(null)
  
  const [addQuestionState,setAddQuestionState] = React.useState(false)
  
  const [editQuestionState,setEditQuestionState] = React.useState(false)

  const [questionUIDToEdit,setQuestionUIDToEdit] = React.useState(null)
  const [questionToEdit,setQuestionToEdit] = React.useState(null) 

  const [questionIndexInQuestionsArray,setQuestionIndexInQuestionsArray]= React.useState(null) 
  const [statefulUserObject, setStatefulUserObject] = React.useState({});
  

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
  })

  return (        
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
                      {question.baselineQuestion}
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
  );
}

