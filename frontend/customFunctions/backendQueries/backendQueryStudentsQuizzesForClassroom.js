const axios = require('axios');

import forceUpdateFirebaseToken from '../../customFunctions/forceUpdateFirebaseToken'

export default function backendQueryStudentsQuizzesForClassroom(globalQuizngagedId, studentUID, props){
  console.log("inside backendQueryStudentsQuizzesForClassroom globalQuizngagedId="+globalQuizngagedId);

  forceUpdateFirebaseToken()

  if(JSON.parse(localStorage.federatedAuthUserData)!=null && JSON.parse(localStorage.federatedAuthDecodedToken)!=null){        
    console.log("sending update")
    axios({
      method: "POST",        
      url: `http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:9090/API/studentsquizzesforclassroom`, 
      data: {            
          //the idToken is only for Firebase, it is used to check that the user is authentic and not a bot.
          federatedAuthDecodedToken:JSON.parse(localStorage.federatedAuthDecodedToken),
          //the id or uid is our internal id for each user in the database of quizngaged app.
          uid:JSON.parse(localStorage.federatedAuthUserData).uid,  
          globalQuizngagedId:globalQuizngagedId,
          studentUID:studentUID
      },
      timeout:10000      
    }).then(async (response) => {
      props.callback(response.data.studentResults);  
    }).catch(e => {          
        console.log(e);                                
    })
  }
}

