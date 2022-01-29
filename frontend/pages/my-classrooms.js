import * as React from 'react';
import Link from 'next/link'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
//import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
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

export default function MyClassrooms() {

  const [userIsAuthenticated,setUserIsAuthenticated] = React.useState(false)  
  const [authenticationAttemptFinished,setAuthenticationAttemptFinished] = React.useState(false)    

  
  const [statefulUserObject, setStatefulUserObject] = React.useState({});
  
  //this is hardcoded but will be fetched when the API is operative. When the API is defined, the subtitle will contain either a brief description or some piece of stat about the classroom like students joined
  const listOfClassrooms = [{title:"Mathematics 6th grade",subtitle:"subtitle"}, {title:"Literature 12th grade",subtitle:"subtitle"}, {title:"Geography 11th grade",subtitle:"subtitle"},{title:"Geography 11th grade",subtitle:"subtitle"},{title:"Geography 11th grade",subtitle:"subtitle"},{title:"Geography 11th grade",subtitle:"subtitle"},{title:"Geography 11th grade",subtitle:"subtitle"},{title:"Geography 11th grade",subtitle:"subtitle"},{title:"Geography 11th grade",subtitle:"subtitle"}];

  
  
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
      <div>
        <CustomTopNavBar statefulUserObject={statefulUserObject} setStatefulUserObject={setStatefulUserObject} topBarTitle={topBarTitle} setTopBarTitle={setTopBarTitle}></CustomTopNavBar>
        <Container>
          <Box paddingTop="1em" paddingBottom="100px">
            <Grid container spacing={2}>
            {
              listOfClassrooms.map((classroom)=>                 
                <Grid item xs={12} md={6} lg={4} key={classroom}>              
                  <CustomPaperReactComponent elevation={3}>
                    <Typography variant='h5'>
                      {classroom.title}
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
  );
}
