// import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
const axios = require('axios');

// import globalUserIsAuthenticated from '../../customGlobalVariables/userIsAuthenticated';
// import federatedAuthUserData from '../../customGlobalVariables/federatedAuthUserData.js'
// import federatedAuthDecodedToken from '../../customGlobalVariables/federatedAuthDecodedToken';

export default function backendQueryGetNewUniqueClassroomID(props){
  if(JSON.parse(localStorage.federatedAuthUserData)!=null && JSON.parse(localStorage.federatedAuthDecodedToken)!=null){    
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

