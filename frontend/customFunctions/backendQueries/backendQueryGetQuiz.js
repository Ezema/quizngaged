const axios = require('axios');

export default function backendQueryGetQuiz(quizId,props){
  console.log("inside backendQueryGetQuiz quizId="+quizId);
  if(JSON.parse(localStorage.federatedAuthUserData)!=null && JSON.parse(localStorage.federatedAuthDecodedToken)!=null){        
    console.log("sending update")
    axios({
      method: "POST",        
      url: 'http://localhost:9090/API/studentjoinquiz', 
      data: {            
          //the idToken is only for Firebase, it is used to check that the user is authentic and not a bot.
          federatedAuthDecodedToken:JSON.parse(localStorage.federatedAuthDecodedToken),
          //the id or uid is our internal id for each user in the database of quizngaged app.
          uid:JSON.parse(localStorage.federatedAuthUserData).uid,  
          quizId:quizId
      },
      timeout:10000      
    }).then(async (response) => {

      props.callback(response.data.joinedQuiz, response.data.studentAnswers);
        
    }).catch(e => {          
        console.log(e);                                
    })
  }
}

