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

import AddIcon from '@mui/icons-material/Add';

import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import ListIcon from '@mui/icons-material/List';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

import CustomPaperReactComponent from '../customComponents/customPaperReactComponent.js';
import StyledFab from '../customComponents/styledFab.js';


import CustomTopNavBar from '../customComponents/customTopNavBar'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseClientConfig from '../customGlobalVariables/firebaseClientConfig';
import EditQuizz from '../customComponents/editQuizz.js';
import AddQuizz from '../customComponents/addQuizz.js';

export default function MyClassrooms(props) {
  

  const userIsAuthenticated = props.userIsAuthenticated;

  const [statefulUserObject, setStatefulUserObject] = React.useState({});

  const [sidebarOpen, setSidebarOpen] = React.useState(false);  

  const [editQuizzState, setEditQuizzState] = React.useState(false);

  const [addQuizzState, setAddQuizzState] = React.useState();

  const toggleSidebar = (openStatus) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setSidebarOpen(openStatus);
  };



  //this is hardcoded but will be fetched when the API is operative. When the API is defined, the subtitle will contain either a brief description or some piece of stat about the classroom like students joined
  const listOfQuizzes = [{id:"1",quizTitle:"Laws of Newton",numberOfQuestions:"10",associatedClassrooms:{}},{id:"2",quizTitle:"Laws of Newton",numberOfQuestions:"10",associatedClassrooms:{}},{id:"3",quizTitle:"Laws of Newton",numberOfQuestions:"10",associatedClassrooms:{}},{id:"4",quizTitle:"Laws of Newton",numberOfQuestions:"10",associatedClassrooms:{}},{id:"5",quizTitle:"Laws of Newton",numberOfQuestions:"10",associatedClassrooms:{}},{id:"6",quizTitle:"Laws of Newton",numberOfQuestions:"10",associatedClassrooms:{}},{id:"7",quizTitle:"Laws of Newton",numberOfQuestions:"10",associatedClassrooms:{}}];

  firebase.initializeApp(firebaseClientConfig);    
  firebase.app()
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      setStatefulUserObject(user)
    }
  })

  const [topBarTitle,setTopBarTitle] = React.useState("My Quizzes")

  const handleAddQuizState = (event, lastIndexOfListOfQuizzes) => {
    setAddQuizzState(true);
    setTopBarTitle("Add Quizz")
  }

  const handleEditQuizzState = (event) => {
    setEditQuizzState(true);
    setTopBarTitle("Edit Quizz");

  }


  return (
    <div>
      <CustomTopNavBar statefulUserObject={statefulUserObject} setStatefulUserObject={setStatefulUserObject} goBackIconState={editQuizzState || addQuizzState} topBarTitle={topBarTitle} setTopBarTitle={setTopBarTitle} editQuizzState={editQuizzState}setEditQuizzState={setEditQuizzState} addQuizzState={addQuizzState} setAddQuizzState={setAddQuizzState}></CustomTopNavBar>
      {/* <CustomTopNavBar statefulUserObject={statefulUserObject} setStatefulUserObject={setStatefulUserObject} topBarTitle={topBarTitle} setTopBarTitle={setTopBarTitle}></CustomTopNavBar> */}
      <Container>
        {(editQuizzState)?(
          <Box paddingTop="1em" paddingBottom="100px">
            <EditQuizz/>
          </Box> 
        )
        :
        (addQuizzState)?
        (<Box paddingTop="1em" paddingBottom="100px">
          <AddQuizz/>
          </Box>)
        :
        (<Box paddingTop="1em" paddingBottom="100px">
          <Grid container spacing={2}>
            {
              listOfQuizzes.map((quizz)=>                 
                <Grid item xs={12} md={6} lg={4} key={quizz.id}>              
                  <CustomPaperReactComponent elevation={3}>                  
                    <Typography variant='h6'>
                        #{quizz.id}
                      </Typography>
                    <Typography variant='subtitle1'>                    
                      Number of questions: {quizz.numberOfQuestions}
                    </Typography>
                    <Button size="small" onClick={(event) => handleEditQuizzState(event, listOfQuizzes.indexOf(quizz))}>EDIT</Button>
                  </CustomPaperReactComponent>
                </Grid>      
              )
            }
          </Grid>
        </Box>)}
      </Container>
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>          
          <StyledFab color="secondary" aria-label="add" onClick={(event)=>handleAddQuizState(event, listOfQuizzes.length)}>
            <AddIcon />
          </StyledFab>          
        </Toolbar>
      </AppBar>
    </div>
  );
}

