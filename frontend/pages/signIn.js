// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Typography } from '@mui/material';
//import { PinDropSharp } from '@mui/icons-material';
const axios = require('axios');
let globalUser = null;
import Alert from '@mui/material/Alert';

import globalUserIsAuthenticated from '../customGlobalVariables/userIsAuthenticated';

function SignIn(props) {
  // Configure Firebase SDK client key.
  const firebaseConfig = {
    apiKey: "AIzaSyAI7fRp-LbEWGJr5o0VphYXxdRK57rKXBI",
    authDomain: "quizngaged-login.firebaseapp.com",
    projectId: "quizngaged-login",
    storageBucket: "quizngaged-login.appspot.com",
    messagingSenderId: "437791237122",
    appId: "1:437791237122:web:3361b862fb8739c968731b",
    measurementId: "G-W6MC0DXLRL"
  };

  //check if firebase is already initialized
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }else {
    firebase.app(); // if already initialized, use that one  
  }

  firebase.auth().useDeviceLanguage();

  // Configure FirebaseUI.
  const uiConfig = {  
    signInFlow: 'redirect',  
    signInSuccessUrl: '/my-classrooms',  

    callbacks: {
      // Avoid redirects after sign-in.    

      signInSuccessWithAuthResult: (authData) => {        
        
        firebase.auth().currentUser.getIdToken(false).then(function(idToken) {            
            axios({
              method: "POST",        
              url: 'http://localhost:8080',        
              data: {            
                  "globalUser": globalUser,            
                  "idToken": idToken
              },
              timeout:5000
            }).then(async (response) => {                                   
                props.setUserIsAuthenticated(true)   
                globalUserIsAuthenticated.userIsAuthenticated = true                                         
                //props.setUser(globalUser)
            }).catch(e => {
                //if our server rejects this user, a notification must be shown
                console.log(e);                      
                //props.setUserIsAuthenticated(false)      
                //props.setUserAuthenticationFailed(true)        
            })
        }).catch(function(error) {
          //props.setUserIsAuthenticated(false)
          //props.setUserAuthenticationFailed(true)        
          //if google's server rejects this user, a notification must be shown
        });
        
      }
    },
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
  };

  firebase.auth().onAuthStateChanged((user)=>{
  //setLoading view
  globalUser = user    
  })

  return (
    <div>
      <Typography variant='h4'>
        Welcome back
      </Typography>
      
        {(props.userAuthenticationFailed)?
        (
          <Alert severity="error">This is an error message!</Alert>)
          :
          (<div></div>)}
      <StyledFirebaseAuth style={{width:'100%'}} uiCallback={ui => ui.disableAutoSignIn()} uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}

export default SignIn