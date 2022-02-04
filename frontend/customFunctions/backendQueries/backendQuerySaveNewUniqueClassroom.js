
const axios = require('axios');

export default function backendQuerySaveNewUniqueClassroom (newClassroomUID,classroomjson){    
  if(JSON.parse(localStorage.federatedAuthUserData)!=null && JSON.parse(localStorage.federatedAuthDecodedToken)!=null){    
    axios({
      method: "POST",        
      url: 'http://localhost:9090/API/savenewuniqueclassroom',        
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
        //newClassroomUID
        return response.data.globalUniqueID
    }).catch(e => {          
        console.log(e);                                
    })
  }
}

//backendQuerySaveNewUniqueClassroom

