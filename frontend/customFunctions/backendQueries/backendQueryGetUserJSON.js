import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
const axios = require('axios');

import federatedAuthUserData from '../../customGlobalVariables/federatedAuthUserData.js'
import quizngagedUserData from '../../customGlobalVariables/quizngagedUserData';


export default function backendQueryGetUserJSON(props){  
    
    firebase.auth().currentUser.getIdToken(true).then(function(idToken) {    
        axios({
            method: "POST",        
            url: 'http://localhost:9090/API/getuserJSON',        
            data: {            
                //the idToken is only for Firebase, it is used to check that the user is authentic and not a bot.
                federatedAuthDecodedToken:idToken,
                //the id or uid is our internal id for each user in the database of quizngaged app.
                uid:federatedAuthUserData.uid,          
            },
            timeout:10000
        }).then(async (response) => {        
            quizngagedUserData = JSON.parse(response.data.userjson.userjson)
            props.callback(quizngagedUserData)
            //console.log("callback: ", props.callback)
            //return true
        }).catch(e => {          
            console.log(e);                                
        })
    
        }).catch(function(error) {
        //props.setUserIsAuthenticated(false)
        //props.setUserAuthenticationFailed(true)        
        //if google's server rejects this user, a notification must be shown
        });      

}

