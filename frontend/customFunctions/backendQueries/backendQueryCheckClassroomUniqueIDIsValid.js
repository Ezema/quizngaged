import { useCallback } from 'react';

const axios = require('axios');

export default function backendQueryCheckClassroomUniqueIDIsValid(props,classroomUniqueId){

  if(JSON.parse(localStorage.federatedAuthUserData)!=null && JSON.parse(localStorage.federatedAuthDecodedToken)!=null){        
    axios({
      method: "POST",        
      url: 'http://localhost:9090/API/checkclassroomuniqueidisvalid', 
      data: {            
          //the idToken is only for Firebase, it is used to check that the user is authentic and not a bot.
          federatedAuthDecodedToken:JSON.parse(localStorage.federatedAuthDecodedToken),
          //the id or uid is our internal id for each user in the database of quizngaged app.
          uid:JSON.parse(localStorage.federatedAuthUserData).uid,  
          classroomUniqueId:classroomUniqueId
      },
      timeout:10000
    }).then(async (response) => {                 
        props.callback(response.data.uniqueClassroomIDValidity)

        let copy = JSON.parse(localStorage.quizngagedUserData)            
        copy.classrooms.push(JSON.parse(response.data.classroomjson))        
        console.log("copy",copy)
        localStorage.setItem("quizngagedUserData",JSON.stringify(copy))
        console.log("localStorage",JSON.parse(localStorage.quizngagedUserData))
        /* response.data.classroomowneruid
        response.data.uniqueclassroomid */
        
    }).catch(e => {          
        console.log(e);                                
    })

  }
}
