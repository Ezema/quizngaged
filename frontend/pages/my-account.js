import * as React from 'react';

/* mui libraries */
import Skeleton from '@mui/material/Skeleton'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

/* customComponents */
import CustomTopNavBar from '../customComponents/customTopNavBar'

/* firebase, customFunctions */
import 'firebase/compat/auth';
import backendQueryGetUserJSON from '../customFunctions/backendQueries/backendQueryGetUserJSON';

export default function MyClassrooms(props) {

  const [statefulUserObject, setStatefulUserObject] = React.useState({});
  const [topBarTitle,setTopBarTitle] = React.useState("My Account")

  const [statefulQuizngagedUserData, setStatefulQuizngagedUserData] = React.useState({});

  React.useEffect(()=>{
    if(window.location.pathname.localeCompare("/my-account")!=0){
      window.location.pathname = "/my-account"
    }
    if((localStorage.federatedAuthUserData)==null || localStorage.federatedAuthUserData==undefined){
      router.push('/')
    }else{
      setStatefulUserObject(JSON.parse(localStorage.federatedAuthUserData))      
      backendQueryGetUserJSON({callback:setStatefulQuizngagedUserData})
    }
    
  },[])

  return (
    <div>
      <Grid Container display={'grid'}>
        <Grid item>
          <CustomTopNavBar statefulUserObject={statefulUserObject} setStatefulUserObject={setStatefulUserObject} topBarTitle={topBarTitle} setTopBarTitle={setTopBarTitle}></CustomTopNavBar>          
        </Grid>
        <Grid item marginTop={'2em'}>
          <Grid Container display={'grid'} justifyContent={'center'} textAlign={'center'}>            
            <Grid item justifyContent={'center'}>
              {(statefulQuizngagedUserData.uid==undefined)?
              (
                <Skeleton marginTop='2em' animation="wave" variant='h1'/>
              )
              :
              (
                <Typography>{statefulQuizngagedUserData.uid}</Typography>
              )}
            </Grid>
            <Grid item paddingTop={'1em'} justifyContent={'center'} textAlign={'center'}>
              {(statefulQuizngagedUserData.name==undefined)?
              (
                <Skeleton marginTop='2em' animation="wave" variant='h1'/>
              )
              :
              (
                <Typography>{statefulQuizngagedUserData.name}</Typography>
              )}
            </Grid>
            <Grid item paddingTop={'1em'} justifyContent={'center'} textAlign={'center'}>
              {(statefulQuizngagedUserData.email==undefined)?
              (
                <Skeleton marginTop='2em' animation="wave" variant='h1'/>
              )
              :
              (
                <Typography>{statefulQuizngagedUserData.email}</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
        
          

      </Grid>

    
    </div>
  );
}

