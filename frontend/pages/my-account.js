import * as React from 'react';

import Skeleton from '@mui/material/Skeleton'
import { Container } from '@mui/material';

import CustomTopNavBar from '../customComponents/customTopNavBar'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseClientConfig from '../customGlobalVariables/firebaseClientConfig';

export default function MyClassrooms(props) {

  const [statefulUserObject, setStatefulUserObject] = React.useState({});
  const [topBarTitle,setTopBarTitle] = React.useState("My Account")

  firebase.initializeApp(firebaseClientConfig);    
  firebase.app()
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      setStatefulUserObject(user)
    }
  })

  return (
    <div>
    <CustomTopNavBar statefulUserObject={statefulUserObject} setStatefulUserObject={setStatefulUserObject} topBarTitle={topBarTitle} setTopBarTitle={setTopBarTitle}></CustomTopNavBar>
    <Container>
      <Skeleton marginTop='2em' animation="wave" variant='h1'/>
      <Skeleton marginTop='2em' animation="wave" variant='h1'/>
      <Skeleton marginTop='2em' animation="wave" variant='h1'/>
      <Skeleton marginTop='2em' animation="wave" variant='h1'/>
      <Skeleton marginTop='2em' animation="wave" variant='h1'/>
    </Container>
    </div>
  );
}

