import 'firebase/compat/auth';
const axios = require('axios');

import forceUpdateFirebaseToken from '../../customFunctions/forceUpdateFirebaseToken'

export default function backendQueryGetNewUniqueClassroomID(props){
  if(JSON.parse(localStorage.federatedAuthUserData)!=null && JSON.parse(localStorage.federatedAuthDecodedToken)!=null){    

    forceUpdateFirebaseToken()

    axios({
      method: "POST",        
      url: 'http://localhost:9090/API/getnewuniqueclassroomid',        
      data: {            
          //the idToken is only for Firebase, it is used to check that the user is authentic and not a bot.
          federatedAuthDecodedToken:JSON.parse(localStorage.federatedAuthDecodedToken),
          //the id or uid is our internal id for each user in the database of quizngaged app.
          uid:JSON.parse(localStorage.federatedAuthUserData).uid
      },
      timeout:10000
    }).then(async (response) => {              
        return null        
  
    }).catch(e => {          
        console.log(e);                                
    })
  }
}

