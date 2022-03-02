// import { useCallback } from 'react';

const axios = require('axios');

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import backendQuerySaveUserJSON from './backendQuerySaveUserJSON';

import forceUpdateFirebaseToken from '../../customFunctions/forceUpdateFirebaseToken'

export default function backendQueryCheckClassroomUniqueIDIsValid(props,classroomUniqueId,checkOnly){
  if(JSON.parse(localStorage.federatedAuthUserData)!=null && JSON.parse(localStorage.federatedAuthDecodedToken)!=null){   

    forceUpdateFirebaseToken()

    axios({
      method: "POST",        
      url: `http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:9090/API/checkclassroomuniqueidisvalid`, 
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
      if(checkOnly == false){
        let copy = JSON.parse(localStorage.quizngagedUserData)            
        //modify the server json object
        let modifiedJSON = JSON.parse(response.data.classroomjson)
        modifiedJSON.globalQuizngagedId = response.data.uniqueclassroomid
        modifiedJSON.classroomowneruid = response.data.uniqueclassroomid
        copy.classrooms.push(modifiedJSON)
        localStorage.setItem("quizngagedUserData",JSON.stringify(copy))        
        backendQuerySaveUserJSON(()=>{})
      }       
    }).catch(e => {          
        console.log(e);                                
    })
  }
}

