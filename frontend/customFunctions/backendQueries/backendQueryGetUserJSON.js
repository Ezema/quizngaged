import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
const axios = require('axios');
//require('dotenv').config();

import quizngagedUserData from '../../customGlobalVariables/quizngagedUserData';

export default function backendQueryGetUserJSON(props){    

    /* let serverHostname = null
    if(window.location.hostname.localeCompare('localhost')!=0){
        serverHostname = 
    }else{
        serverHostname = 
    } */

    if(JSON.parse(localStorage.federatedAuthUserData)!=null && JSON.parse(localStorage.federatedAuthDecodedToken)!=null){
        axios({
            method: "POST",            
            url: 'http://localhost:9090/API/getuserJSON',        
            data: {            
                //the idToken is only for Firebase, it is used to check that the user is authentic and not a bot.
                federatedAuthDecodedToken:JSON.parse(localStorage.federatedAuthDecodedToken),
                //the id or uid is our internal id for each user in the database of quizngaged app.
                uid:JSON.parse(localStorage.federatedAuthUserData).uid,          
            },
            timeout:10000
        }).then(async (response) => {    
            localStorage.setItem("quizngagedUserData", response.data.userjson.userjson) 

            props.callback((JSON.parse(localStorage.quizngagedUserData)))
            //return true
        }).catch(e => {          
            console.log(e);                                
        })    
    }
}

