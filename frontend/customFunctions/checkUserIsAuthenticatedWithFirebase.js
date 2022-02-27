import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import globalUserIsAuthenticated from '../customGlobalVariables/userIsAuthenticated';
import firebaseClientConfig from '../customGlobalVariables/firebaseClientConfig';

export default function checkUserIsAuthenticatedWithFirebase(props){
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseClientConfig);    
    }
    else{
        firebase.app()        
    } 
    firebase.auth().onAuthStateChanged((user)=>{
        if(firebase.auth().currentUser){
            props.setUserIsAuthenticated(true)
            globalUserIsAuthenticated.userIsAuthenticated = true
        }else{
            props.setUserIsAuthenticated(false)
            globalUserIsAuthenticated.userIsAuthenticated = false
        }
    })
}