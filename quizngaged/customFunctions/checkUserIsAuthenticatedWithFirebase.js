import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import globalUserIsAuthenticated from '../customGlobalVariables/userIsAuthenticated';
import firebaseClientConfig from '../customGlobalVariables/firebaseClientConfig';

export default function checkUserIsAuthenticatedWithFirebase(props){
    const firebaseConfig = {
        apiKey: "AIzaSyAI7fRp-LbEWGJr5o0VphYXxdRK57rKXBI",
        authDomain: "quizngaged-login.firebaseapp.com",
        projectId: "quizngaged-login",
        storageBucket: "quizngaged-login.appspot.com",
        messagingSenderId: "437791237122",
        appId: "1:437791237122:web:3361b862fb8739c968731b",
        measurementId: "G-W6MC0DXLRL"
    };

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