
const axios = require('axios');

export default function backendQueryCreateLaunchQuiz(quizJson,uniqueclassroomid){    
  if(JSON.parse(localStorage.federatedAuthUserData)!=null && JSON.parse(localStorage.federatedAuthDecodedToken)!=null){    
    axios({
      method: "POST",        
      url: 'http://localhost:9090/API/launchquiz',
      data: {            
          //the idToken is only for Firebase, it is used to check that the user is authentic and not a bot.
          federatedAuthDecodedToken:JSON.parse(localStorage.federatedAuthDecodedToken),
          //the id or uid is our internal id for each user in the database of quizngaged app.
          uid:JSON.parse(localStorage.federatedAuthUserData).uid,
          quizJson: quizJson,
          uniqueclassroomid: uniqueclassroomid
      },
      timeout:10000
    }).then(async (response) => {        
        
    }).catch(e => {          
        console.log(e);                                
    })
  }
}

