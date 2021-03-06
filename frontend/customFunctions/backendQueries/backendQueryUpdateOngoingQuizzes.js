// import { useCallback } from 'react';

const axios = require('axios');

import backendQuerySaveUserJSON from './backendQuerySaveUserJSON';

import forceUpdateFirebaseToken from '../../customFunctions/forceUpdateFirebaseToken'

export default function backendQueryUpdateOngoingQuizzes(viewClassroomId,props,classroomUniqueId){
    console.log("inside")
  if(JSON.parse(localStorage.federatedAuthUserData)!=null && JSON.parse(localStorage.federatedAuthDecodedToken)!=null){        
    console.log("sending update")

    forceUpdateFirebaseToken()

    axios({
      method: "POST",        
      url: `${process.env.NEXT_PUBLIC_BACKEND_HOST}/API/addlivequizzesforclassroom`, 
      data: {            
          //the idToken is only for Firebase, it is used to check that the user is authentic and not a bot.
          federatedAuthDecodedToken:JSON.parse(localStorage.federatedAuthDecodedToken),
          //the id or uid is our internal id for each user in the database of quizngaged app.
          uid:JSON.parse(localStorage.federatedAuthUserData).uid,  
          classroomUniqueId:classroomUniqueId
      },
      timeout:10000      
    }).then(async (response) => {

        let copy = JSON.parse(localStorage.quizngagedUserData)            
        //modify the server json object
        let modifiedJSON = JSON.parse(response.data.classroomjson)
        modifiedJSON.globalQuizngagedId = response.data.uniqueclassroomid
        modifiedJSON.classroomowneruid = response.data.uniqueclassroomid
        modifiedJSON.ongoingLiveQuizzes = [];
        for (var i = 0; i < response.data.ongoingQuizzes.length; i++) {
          modifiedJSON.ongoingLiveQuizzes.push(
            {
              launchedquizid: response.data.ongoingQuizzes[i].launchedquizid,
              quizjson: JSON.parse(response.data.ongoingQuizzes[i].quizjson),
            }
          );
        }
        copy.classrooms[viewClassroomId]=(modifiedJSON)
        localStorage.setItem("quizngagedUserData",JSON.stringify(copy))        
        backendQuerySaveUserJSON(()=>{})
        console.log("finished update")
        props.callback(false, modifiedJSON);    
    }).catch(e => {          
        console.log(e);                                
    })

  }
}

