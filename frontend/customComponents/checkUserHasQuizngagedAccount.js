import * as React from 'react';

/* customComponents */
import LoadingScreen from './loadingScreen.js';
import CreateQuizngagedAccount from './createQuizngagedAccount';

/* customFunctions */
import backendQueryCheckUserHasQuizngagedAccount from '../customFunctions/backendQueries/backendQueryCheckUserHasQuizngagedAccount.js';

export default function CheckUserHasQuizngagedAccount(props){        
    const [serverConfirmedUserDoesNotHaveAccount,setServerConfirmedUserDoesNotHaveAccount] = React.useState(null)

    //handle in the backend
    backendQueryCheckUserHasQuizngagedAccount({
        setUserHasQuizngagedAccount:props.setUserHasQuizngagedAccount,
        serverConfirmedUserDoesNotHaveAccount:serverConfirmedUserDoesNotHaveAccount,setServerConfirmedUserDoesNotHaveAccount:setServerConfirmedUserDoesNotHaveAccount
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