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

import LoadingScreen from '../customComponents/loadingScreen.js';
import Index from '../pages/index.js';


import CustomTopNavBar from '../customComponents/customTopNavBar'

import firebaseClientConfig from '../customGlobalVariables/firebaseClientConfig';
import EditQuizz from '../customComponents/editQuizz.js';
import AddQuizz from '../customComponents/addQuizz.js';

//Firebase
//import firebase from 'firebase/compat/app';
//import 'firebase/compat/auth';

//Global variables
import globalUserIsAuthenticated from '../customGlobalVariables/userIsAuthenticated';
//Backend communication functions
import backendQueryGetUserJSON from '../customFunctions/backendQueries/backendQueryGetUserJSON.js';

import { useRouter } from 'next/router'


export default function MyClassrooms(props) {

  const router = useRouter()

  const [userIsAuthenticated,setUserIsAuthenticated] = React.useState(false)  
  const [authenticationAttemptFinished,setAuthenticationAttemptFinished] = React.useState(false)

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

  React.useEffect(()=>{
    if(window.location.pathname.localeCompare("/my-quizzes")!=0){
      window.location.pathname = "/my-quizzes"
    }
    if((localStorage.federatedAuthUserData)==null || localStorage.federatedAuthUserData==undefined){
      router.push('/')
    }/* else if(localStorage.quizngagedUserData==null || localStorage.quizngagedUserData==undefined){
      router.push('/')
    } */else{
      setStatefulUserObject(JSON.parse(localStorage.federatedAuthUserData))
      backendQueryGetUserJSON({callback:setStatefulQuizngagedUserData})
    }       
  },[])


  const [statefulQuizngagedUserData, setStatefulQuizngagedUserData] = React.useState({});

  const [topBarTitle,setTopBarTitle] = React.useState("My Quizzes")

  const handleAddQuizState = (event, lastIndexOfListOfQuizzes) => {
    setAddQuizzState(true);
    setTopBarTitle("Add Quiz")
  }

  const handleEditQuizzState = (event) => {
    setEditQuizzState(true);
    setTopBarTitle("Edit Quiz");

  }


  return (    
      (statefulQuizngagedUserData.quizzes==undefined)?
      (
        <LoadingScreen></LoadingScreen>
      )
      :
      (
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
                  statefulQuizngagedUserData.quizzes.map((quiz)=>                 
                    <Grid item xs={12} md={6} lg={4} key={statefulQuizngagedUserData.quizzes.indexOf(quiz)}>              
                      <CustomPaperReactComponent elevation={3}>                  
                        <Typography variant='h6'>
                            #{quiz.id}
                          </Typography>
                        <Typography variant='subtitle1'>                    
                          Number of questions: {quiz.title}
                        </Typography>
                        <Button size="small" onClick={(event) => handleEditQuizzState(event, listOfQuizzes.indexOf(quiz))}>EDIT</Button>
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
      )    
  )
}

