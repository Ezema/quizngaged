const axios = require('axios');

export default function backendQuerySaveUserJSON(callback){  
  if(JSON.parse(localStorage.federatedAuthUserData)!=null && JSON.parse(localStorage.federatedAuthDecodedToken)!=null){  
    console.log("backendpost localstorage: ",JSON.parse(localStorage.quizngagedUserData))
    axios({
      method: "POST",        
      url: 'http://localhost:9090/API/saveuserJSON',        
      data: {            
          //the idToken is only for Firebase, it is used to check that the user is authentic and not a bot.
          federatedAuthDecodedToken:JSON.parse(localStorage.federatedAuthDecodedToken),
          //the id or uid is our internal id for each user in the database of quizngaged app.
          uid:JSON.parse(localStorage.federatedAuthUserData).uid,
          //userjson: JSON.stringify(quizngagedUserData)
          userjson: localStorage.quizngagedUserData
      },
      timeout:10000
    }).then(async (response) => {                      
        callback()
    }).catch(e => {          
        console.log(e);                                
    })
  }

}

