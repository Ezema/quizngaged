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
import EditQuiz from '../customComponents/editQuiz.js';
import AddQuizz from '../customComponents/addQuizz.js';

//Firebase
//import firebase from 'firebase/compat/app';
//import 'firebase/compat/auth';

//Global variables
import globalUserIsAuthenticated from '../customGlobalVariables/userIsAuthenticated';
//Backend communication functions
import backendQueryGetUserJSON from '../customFunctions/backendQueries/backendQueryGetUserJSON.js';

import { useRouter } from 'next/router'


export default function MyQuizzes(props) {

  const router = useRouter()

  const [statefulUserObject, setStatefulUserObject] = React.useState({});

  const [sidebarOpen, setSidebarOpen] = React.useState(false);  

  const [editQuizState, setEditQuizState] = React.useState(false);

  const [addQuizState, setAddQuizState] = React.useState();

  const [listOfQuizzes,setListOfQuizzes] = React.useState(null);

  const [newQuizUID,setNewQuizUID] = React.useState(null)
  const [editQuizUID,setEditQuizUID] = React.useState(null)

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
  },[addQuizState,editQuizState])


  const [statefulQuizngagedUserData, setStatefulQuizngagedUserData] = React.useState({});

  const [topBarTitle,setTopBarTitle] = React.useState("My Quizzes")

  const handleAddQuizState = (event, lastIndexOfListOfQuizzes) => {
    let copyOfStatefulArray = JSON.parse(JSON.stringify(listOfQuizzes));        

    setNewQuizUID(parseInt(copyOfStatefulArray[copyOfStatefulArray.length-1].id) + 1 )

    setAddQuizState(true);
    setTopBarTitle("Add Quiz")
  }

  const handleEditQuizState = (event, index) => {
    console.log("is this index undefined?: ", index)
    setEditQuizUID(index)
    setEditQuizState(true);
    setTopBarTitle("Edit Quiz");
  }

  const handleOpenQuizzState = (event) => {
  }  


  return (    
      (statefulQuizngagedUserData.quizzes==undefined)?
      (
        <LoadingScreen></LoadingScreen>
      )
      :
      (listOfQuizzes==null)?
      (
        <div>
        {          
        setListOfQuizzes(statefulQuizngagedUserData.quizzes)}
        {console.log("setting")}
        <LoadingScreen></LoadingScreen>
        </div>
      )
      :
      (
        <div style={{          
          overflowY: 'hidden',
          overflowX: 'hidden',          
          minHeight: '100vh',
          maxHeight: '100vh',  
        }}>
          <CustomTopNavBar statefulUserObject={statefulUserObject} setStatefulUserObject={setStatefulUserObject} goBackIconState={editQuizState || addQuizState} topBarTitle={topBarTitle} setTopBarTitle={setTopBarTitle} editQuizState={editQuizState}setEditQuizState={setEditQuizState} addQuizState={addQuizState} setAddQuizState={setAddQuizState}></CustomTopNavBar>
          {/* <CustomTopNavBar statefulUserObject={statefulUserObject} setStatefulUserObject={setStatefulUserObject} topBarTitle={topBarTitle} setTopBarTitle={setTopBarTitle}></CustomTopNavBar> */}
          <Container>
            {(editQuizState)?(
              <Box paddingTop="1em" paddingBottom="100px">
                <EditQuiz listOfQuizzes={listOfQuizzes} setListOfQuizzes={setListOfQuizzes} editQuizUID={editQuizUID} setEditQuizState={setEditQuizState} editQuizState={editQuizState}/>
              </Box> 
            )
            :
            (addQuizState)?
            (<Box paddingTop="1em" paddingBottom="100px">
              <AddQuizz listOfQuizzes={listOfQuizzes} setListOfQuizzes={setListOfQuizzes} newQuizUID={newQuizUID} setAddQuizState={setAddQuizState}/>
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
                          Quiz Title: {quiz.quizTitle}
                        </Typography>
                        <Typography variant='subtitle1'>                    
                          Number of questions: {quiz.questions.length}
                        </Typography>
                        {/* <Button size="small" onClick={(event) => handleOpenQuizzState(event, quiz.id)}>VIEW</Button> */}
                        <Button size="small" onClick={(event) => handleEditQuizState(event, quiz.id)}>EDIT</Button>
                      </CustomPaperReactComponent>
                    </Grid>      
                  )
                }
              </Grid>
            </Box>)}
          </Container>
          {
            (addQuizState)?
            (<div></div>)
            :
            (editQuizState)?
            (<div></div>)
            :
            (
              <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar>          
                  <StyledFab color="secondary" aria-label="add" onClick={(event)=>handleAddQuizState(event, listOfQuizzes.length)}>
                    <AddIcon />
                  </StyledFab>          
                </Toolbar>
              </AppBar>
            )
          }
        </div>
      )    
  )
}

