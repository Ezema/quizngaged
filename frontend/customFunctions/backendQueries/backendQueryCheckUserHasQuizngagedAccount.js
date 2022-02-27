import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
const axios = require('axios');

// import globalUserIsAuthenticated from '../../customGlobalVariables/userIsAuthenticated';
import federatedAuthUserData from '../../customGlobalVariables/federatedAuthUserData.js'
// import federatedAuthDecodedToken from '../../customGlobalVariables/federatedAuthDecodedToken';

export default function backendQueryCheckUserHasQuizngagedAccount(props){
  firebase.auth().currentUser.getIdToken(false).then(function(idToken) {    
    axios({
      method: "POST",        
      url: 'http://localhost:9090/API/checkuserhasaccount',        
      data: {            
          //the idToken is only for Firebase, it is used to check that the user is authentic and not a bot.
          federatedAuthDecodedToken:idToken,
          //the id or uid is our internal id for each user in the database of quizngaged app.
          uid:federatedAuthUserData.uid        
      },
      timeout:10000
    }).then(async (response) => {              
        if(response.data.hasAccount==true){          
          props.setUserHasQuizngagedAccount(true);
        }else if(response.data.hasAccount==false){
          props.setServerConfirmedUserDoesNotHaveAccount(true);          
        }
    }).catch(e => {          
        console.log(e);                                
    })
  }).catch(function(error) {
  });
}

