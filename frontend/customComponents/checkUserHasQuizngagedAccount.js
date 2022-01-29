import * as React from 'react';
import LoadingScreen from './loadingScreen.js';
const axios = require('axios');
import Router from 'next/router'
import MyClassrooms from '../pages/my-classrooms.js';
import CreateQuizngagedAccount from './createQuizngagedAccount';

export default function CheckUserHasQuizngagedAccount(props){        
    const [serverConfirmedUserDoesNotHaveAccount,setServerConfirmedUserDoesNotHaveAccount] = React.useState(null)

    axios({
        method: "POST",        
        url: 'http://localhost:9090/API/checkuserhasaccount',        
        data: {            
            //send the google authenticated user to our backend to check if the user is registered or has to create a new account within quizngaged
            "user": props.user
        },
        timeout:10000
      }).then(async (response) => {              
          if(response.data.hasAccount==true){
            console.log("user has account")
            props.setUserHasQuizngagedAccount(true);
          }else if(response.data.hasAccount==false){
            setServerConfirmedUserDoesNotHaveAccount(true);
            console.log("redirect to create account")
          }

      }).catch(e => {          
          console.log(e);                                
      })


    return(
        <div>
            {(serverConfirmedUserDoesNotHaveAccount!=null)?
                (
                    (serverConfirmedUserDoesNotHaveAccount==true)?
                    (
                        <CreateQuizngagedAccount></CreateQuizngagedAccount>
                    )
                    :
                    (
                        // the index.js will handle the change of view to 'my-classrooms' if the server verifies that the user has indeed an account
                        null
                    )
                    
                    
                )
                :
                (<LoadingScreen></LoadingScreen>)
            }            
        </div>
    )
}