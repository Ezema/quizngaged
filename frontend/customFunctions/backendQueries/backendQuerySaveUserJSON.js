import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
const axios = require('axios');

import federatedAuthUserData from '../../customGlobalVariables/federatedAuthUserData.js'
import quizngagedUserData from '../../customGlobalVariables/quizngagedUserData';

export default function backendQuerySaveUserJSON(callback){  

  console.log("backendpost localstorage: ",localStorage)

  if(JSON.parse(localStorage.federatedAuthUserData)!=null && JSON.parse(localStorage.federatedAuthDecodedToken)!=null){  
    axios({
      method: "POST",        
      url: 'http://localhost:9090/API/saveuserJSON',        
      data: {            
          //the idToken is only for Firebase, it is used to check that the user is authentic and not a bot.
          federatedAuthDecodedToken:JSON.parse(localStorage.federatedAuthDecodedToken),
          //the id or uid is our internal id for each user in the database of quizngaged app.
          uid:JSON.parse(localStorage.federatedAuthUserData).uid,
          //userjson: JSON.stringify(quizngagedUserData)
          userjson: localStorage.quizngagedUserData
      },
      timeout:10000
    }).then(async (response) => {                      
        callback()
    }).catch(e => {          
        console.log(e);                                
    })
  }

}

