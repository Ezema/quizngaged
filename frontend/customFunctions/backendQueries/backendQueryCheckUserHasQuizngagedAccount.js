import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
const axios = require('axios');

import federatedAuthUserData from '../../customGlobalVariables/federatedAuthUserData.js'

export default function backendQueryCheckUserHasQuizngagedAccount(props){

  firebase.auth().currentUser.getIdToken(false).then(function(idToken) {    

    axios({
      method: "POST",              
      url: `${process.env.NEXT_PUBLIC_BACKEND_HOST}/API/checkuserhasaccount`,              
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

