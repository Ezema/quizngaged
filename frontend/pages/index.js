import * as React from 'react';
import logo from '../public/logo.gif';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'; 
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Image from 'next/image'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import SignIn from '../customReactScreenViews/signIn.js'

import CheckUserHasQuizngagedAccount from '../customComponents/checkUserHasQuizngagedAccount.js';

import MyClassrooms from './my-classrooms.js'

import globalUserIsAuthenticated from '../customGlobalVariables/userIsAuthenticated';
import firebaseClientConfig from '../customGlobalVariables/firebaseClientConfig';


export default function Index() {
  const [userIsAuthenticated,setUserIsAuthenticated] = React.useState(false)  
  const [userHasQuizngagedAccount,setUserHasQuizngagedAccount] = React.useState(false)
  const [userAuthenticationFailed,setUserAuthenticationFailed] = React.useState(false)
  const [user,setUser] = React.useState(null)  

  const [URI, setURI] = React.useState(undefined) 

  React.useEffect(()=>{

    if(window.location.pathname.localeCompare("/")!=0){
      window.location.pathname = ""
    }
    
    if(globalUserIsAuthenticated.userIsAuthenticated){
      setUserIsAuthenticated(true)
    }else{
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseClientConfig);    
      }
      else{
          firebase.app()        
      } 
      firebase.auth().onAuthStateChanged((user)=>{
          if(firebase.auth().currentUser){
              setUserIsAuthenticated(true)
              globalUserIsAuthenticated.userIsAuthenticated = true
          }else{
              setUserIsAuthenticated(false)
              globalUserIsAuthenticated.userIsAuthenticated = false
          }
      })    
    }
  })

  return (
    (!userIsAuthenticated)?(
    <div style={{
      textAlign: 'center',
      overflowY: 'hidden',
      overflowX: 'hidden',
      backgroundColor: '#2196f3',
      minHeight: '100vh',
      maxHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'  
    }}>
      <Container maxWidth='xs' display='grid' align="center" justify="center" style={{padding:'2em'}}>
        <Paper style={{paddingBottom:'1em'}}>
          <Grid Container display='grid' align="center" justify="center" style={{padding:'1em'}}>
            <Grid item>            
                <Image className={{width:'100%'}} src={logo} alt='logo'/>                
            </Grid>
            <Grid item>
              <SignIn userAuthenticationFailed={userAuthenticationFailed} setUserAuthenticationFailed={setUserAuthenticationFailed} userIsAuthenticated={userIsAuthenticated} setUserIsAuthenticated={setUserIsAuthenticated} user={user} setUser={setUser}></SignIn>
            </Grid>
          </Grid>  
          <Grid item padding={'0.5em'}>               
            <Grid Container display='flex' justifyContent='space-evenly'>          
              <Button size='small' variant='text'>            
                  Forgot password?
              </Button>
            </Grid>
          </Grid>
          <Grid item paddingTop='0.5em'>
            <Typography variant='body2'>
              2022 Quizngaged Inc.
            </Typography>
          </Grid>
        </Paper>        
      </Container>      
    </div>)
    :(!userHasQuizngagedAccount)?
      (<CheckUserHasQuizngagedAccount userHasQuizngagedAccount={userHasQuizngagedAccount} setUserHasQuizngagedAccount={setUserHasQuizngagedAccount} user={user}></CheckUserHasQuizngagedAccount>)
      :
      (<MyClassrooms URI={URI} setURI={setURI}></MyClassrooms>)
  );
}