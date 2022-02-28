import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import firebaseConfig from '../customGlobalVariables/firebaseClientConfig.js'

export default function forceUpdateFirebaseToken(){
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }else {
        firebase.app(); // if already initialized, use that one  
      }
    
    firebase.auth().onAuthStateChanged((user)=>{
        if(user){ 
            localStorage.setItem("federatedAuthUserData",JSON.stringify(user))
            firebase.auth().currentUser.getIdToken(false).then(function(idToken) {          
            localStorage.setItem("federatedAuthDecodedToken",JSON.stringify(idToken))
            federatedAuthDecodedToken.federatedAuthDecodedToken = idToken
            }).catch(function(error) {
                //props.setUserIsAuthenticated(false)1
                //props.setUserAuthenticationFailed(true)        
                //if google's server rejects this user, a notification must be shown
            });
        }            
    })
}
