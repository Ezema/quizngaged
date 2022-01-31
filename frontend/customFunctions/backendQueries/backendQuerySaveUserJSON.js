import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
const axios = require('axios');

import federatedAuthUserData from '../../customGlobalVariables/federatedAuthUserData.js'
import quizngagedUserData from '../../customGlobalVariables/quizngagedUserData';

export default function backendQuerySaveUserJSON(callback){  

  firebase.auth().currentUser.getIdToken(false).then(function(idToken) {    
    axios({
      method: "POST",        
      url: 'http://localhost:9090/API/saveuserJSON',        
      data: {            
          //the idToken is only for Firebase, it is used to check that the user is authentic and not a bot.
          federatedAuthDecodedToken:idToken,
          //the id or uid is our internal id for each user in the database of quizngaged app.
          uid:federatedAuthUserData.uid,
          userjson: JSON.stringify(quizngagedUserData)
      },
      timeout:10000
    }).then(async (response) => {                      
        callback()
    }).catch(e => {          
        console.log(e);                                
    })

  }).catch(function(error) {
    //props.setUserIsAuthenticated(false)
    //props.setUserAuthenticationFailed(true)        
    //if google's server rejects this user, a notification must be shown
  });

  

}

