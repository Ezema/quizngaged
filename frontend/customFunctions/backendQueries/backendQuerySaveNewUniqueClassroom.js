
const axios = require('axios');
import backendQuerySaveUserJSON from './backendQuerySaveUserJSON';

import forceUpdateFirebaseToken from '../../customFunctions/forceUpdateFirebaseToken'

export default function backendQuerySaveNewUniqueClassroom (newClassroomUID,classroomjson){    
  if(JSON.parse(localStorage.federatedAuthUserData)!=null && JSON.parse(localStorage.federatedAuthDecodedToken)!=null){    
    
    forceUpdateFirebaseToken()
    
    axios({
      method: "POST",        
      url: `${process.env.NEXT_PUBLIC_BACKEND_HOST}/API/savenewuniqueclassroom`,
      data: {            
          //the idToken is only for Firebase, it is used to check that the user is authentic and not a bot.
          federatedAuthDecodedToken:JSON.parse(localStorage.federatedAuthDecodedToken),
          //the id or uid is our internal id for each user in the database of quizngaged app.
          uid:JSON.parse(localStorage.federatedAuthUserData).uid,
          //userjson: JSON.stringify(quizngagedUserData)
          classroomjson: classroomjson
      },
      timeout:10000
    }).then(async (response) => {        
        let copy = JSON.parse(localStorage.quizngagedUserData)        
        copy.classrooms[newClassroomUID].globalQuizngagedId = response.data.globalUniqueID        
        localStorage.setItem('quizngagedUserData',JSON.stringify(copy))
        backendQuerySaveUserJSON(()=>{})
    }).catch(e => {          
        console.log(e);                                
    })
  }
}

//backendQuerySaveNewUniqueClassroom

