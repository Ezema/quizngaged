import * as React from 'react';
import Box from '@mui/material/Box';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import AddIcon from '@mui/icons-material/Add';

import CustomPaperReactComponent from '../customComponents/customPaperReactComponent.js';
import StyledFab from '../customComponents/styledFab.js';

import LoadingScreen from '../customComponents/loadingScreen.js'

import Index from './index.js'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import globalUserIsAuthenticated from '../customGlobalVariables/userIsAuthenticated';
import firebaseClientConfig from '../customGlobalVariables/firebaseClientConfig';

import CustomTopNavBar from '../customComponents/customTopNavBar'

import backendQueryGetUserJSON from '../customFunctions/backendQueries/backendQueryGetUserJSON.js';
import quizngagedUserData from '../customGlobalVariables/quizngagedUserData.js';

export default function MyClassrooms() {

  const [userIsAuthenticated,setUserIsAuthenticated] = React.useState(false)  
  const [authenticationAttemptFinished,setAuthenticationAttemptFinished] = React.useState(false)
  
  const [statefulUserObject, setStatefulUserObject] = React.useState({});
  
  const [statefulQuizngagedUserData, setStatefulQuizngagedUserData] = React.useState({});
  
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

  const [topBarTitle,setTopBarTitle] = React.useState("My Classroooms")

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
      (
        <div>
          <CustomTopNavBar statefulUserObject={statefulUserObject} setStatefulUserObject={setStatefulUserObject} topBarTitle={topBarTitle} setTopBarTitle={setTopBarTitle}></CustomTopNavBar>
          <Container>
            <Box paddingTop="1em" paddingBottom="100px">
              <Grid container spacing={2}>
              {
                statefulQuizngagedUserData.quizngagedUserData.classrooms.map((classroom)=>                 
                  <Grid item xs={12} md={6} lg={4} key={statefulQuizngagedUserData.quizngagedUserData.classrooms.indexOf(classroom)}>              
                    <CustomPaperReactComponent elevation={3}>
                      <Typography variant='h5'>
                        {classroom.name}
                      </Typography>
                      <Typography variant='subtitle1'>
                        {classroom.subtitle}
                      </Typography>
                    </CustomPaperReactComponent>
                  </Grid>      
                )
              }
              </Grid>
              {/* <Grid container justifyContent="flex-end" paddingTop="1em">
                <Fab color="primary" size="large" aria-label="add" style={{position:'fixed',bottom:"1em",right:"1em",}}>
                  <AddIcon />
                </Fab>
              </Grid> */}
            </Box>
            
            
          </Container>
          <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar>          
              <StyledFab color="secondary" aria-label="add">
                <AddIcon />
              </StyledFab>          
            </Toolbar>
          </AppBar>
        </div>
      )
    )    
  );
}

