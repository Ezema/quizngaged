import Container from '@mui/material/Container';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import quizngagedUserData from '../customGlobalVariables/quizngagedUserData.js';

import backendQuerySaveUserJSON from '../customFunctions/backendQueries/backendQuerySaveUserJSON.js';

import federatedAuthUserData from '../customGlobalVariables/federatedAuthUserData.js';

const axios = require('axios');

import Router from 'next/router';


import TextField from '@mui/material/TextField';
import { Avatar } from '@mui/material';
import LoadingScreen from './loadingScreen.js';

const steps = ['Add your information', 'Confirm your details'];



export default function StepsToCreateAccount(props){            

    const [activeStep, setActiveStep] = React.useState(0);
    const [buttonText, setButtonText] = React.useState('Next');    
    const [uploadUserDataInProgress, setUploadUserDataInProgress] = React.useState(false);    
    

    const [email, setEmail] = React.useState(JSON.parse(localStorage.federatedAuthUserData).email);
    const [name, setName] = React.useState(JSON.parse(localStorage.federatedAuthUserData).displayName);    
    const [phone, setPhone] = React.useState(JSON.parse(localStorage.federatedAuthUserData).phoneNumber);    
    const [userType, setUserType] = React.useState(props.userType); 
    
    const handleUserEntryChange = (event,type)=>{
        if(type.localeCompare('email')){
            setEmail(event.target.value)
        }else if(type.localeCompare('name')){
            setName(event.target.value)
        }else if(type.localeCompare('phone')){
            setPhone(event.target.value)
        }else if(type.localeCompare('userType')){
            setUserType(event.target.value)
        }

    }
    

    //console.log("props: ", props)

    const handleUserDataUpload = ()=>{                        
        
        if(userType.localeCompare('Teacher')==0){
            let newQuizngagedUser = JSON.parse(JSON.stringify(quizngagedUserData.quizngagedTeacherUserData))
            
            newQuizngagedUser.uid = JSON.parse(localStorage.federatedAuthUserData).uid

            newQuizngagedUser.userType = userType
            newQuizngagedUser.name = name
            newQuizngagedUser.email = email
            newQuizngagedUser.phone = phone        

            localStorage.setItem("quizngagedUserData",JSON.stringify(newQuizngagedUser))

            setUploadUserDataInProgress(true)        
            backendQuerySaveUserJSON(function callback(){Router.push('my-classrooms')})
        }else if(userType.localeCompare('Student')==0){
            let newQuizngagedUser = JSON.parse(JSON.stringify(quizngagedUserData.quizngagedStudentUserData))
            
            newQuizngagedUser.uid = JSON.parse(localStorage.federatedAuthUserData).uid

            newQuizngagedUser.userType = userType
            newQuizngagedUser.name = name
            newQuizngagedUser.email = email
            newQuizngagedUser.phone = phone        

            localStorage.setItem("quizngagedUserData",JSON.stringify(newQuizngagedUser))

            setUploadUserDataInProgress(true)        
            backendQuerySaveUserJSON(function callback(){Router.push('my-classrooms')})
        }
        
    }

    return(
        (uploadUserDataInProgress)?
        (
            <LoadingScreen></LoadingScreen>
        )
        :
        (
        <div
        style={{
            textAlign: 'center',
            overflowY: 'hidden',
            overflowX: 'hidden',
            backgroundColor: '#2196f3',
            minHeight: '100vh',
            maxHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'  
        }}>
            <Container>
                <Paper style={{padding:'2em'}} >
                    <Grid Container>
                        <Grid item padding={'1em'}>
                            <Stepper activeStep={activeStep}>
                                {steps.map((label, index) => {                    
                                    return (
                                        <Step key={label}>
                                            <StepLabel >{label}</StepLabel>
                                        </Step>
                                );
                                })}
                            </Stepper>
                        </Grid>
                        <Grid item >
                            <Grid Container padding={'2em'} display={'grid'}  justifyContent={'center'} justifyItems={'center'} alignItems={'center'} alignContent={'center'}>
                                <Grid item paddingBottom={'1em'}>
                                    <Avatar src={JSON.parse(localStorage.federatedAuthUserData).photoURL} sx={{ width: '3em', height: '3em' }}/>
                                </Grid>
                                <Grid item paddingBottom={'1em'}>                            
                                    <TextField
                                        fullWidth
                                        disabled
                                        id="email"
                                        label="Email"
                                        value={email}
                                        onClick={(event)=>handleUserEntryChange(event.target,email)}
                                        defaultValue={JSON.parse(localStorage.federatedAuthUserData).email}
                                    />
                                </Grid>
                                <Grid item paddingBottom={'1em'} >                            
                                    <TextField
                                        fullWidth                                        
                                        id="user-type"
                                        label="User type"
                                        value={userType}
                                        onClick={(event)=>handleUserEntryChange(event.target,userType)}
                                        defaultValue={props.userProfile}
                                    />
                                </Grid>
                                <Grid item paddingBottom={'1em'}>
                                    <TextField
                                        fullWidth
                                        required
                                        id="name-required"
                                        label="Name"
                                        value={name}
                                        onClick={(event)=>handleUserEntryChange(event.target,name)}
                                        defaultValue={JSON.parse(localStorage.federatedAuthUserData).displayName}
                                    />
                                </Grid>
                                <Grid item paddingBottom={'1em'}>
                                    <TextField                              
                                        fullWidth
                                        id="phone-option"
                                        label="Phone"
                                        value={phone}
                                        onClick={(event)=>handleUserEntryChange(event.target,phone)}
                                        defaultValue={(JSON.parse(localStorage.federatedAuthUserData).phoneNumber)}
                                    />
                                </Grid>                                
                            </Grid>
                            
                        </Grid>
                    </Grid>                                                                
                    {(activeStep!=0)?
                    (
                        <Grid Container columns={2} alignContent={'center'} justifyContent={'center'} display={'flex'}>                        
                            <Grid item paddingRight={'2em'} width={'30%'}>
                                <Button fullWidth size='large' variant='contained' color='secondary' onClick={()=>setActiveStep(0)} startIcon={<NavigateBeforeIcon/>}>
                                    Back
                                </Button>
                            </Grid>
                            <Grid item paddingLeft={'2em'} width={'30%'}>
                                <Button fullWidth size='large' variant='contained' color='success' onClick={handleUserDataUpload} endIcon={<NavigateNextIcon/>}>
                                    Confirm
                                </Button>
                            </Grid>
                        </Grid>
            
                    ):
                    (                        
                        <Grid Container columns={2} alignContent={'center'} justifyContent={'center'} display={'flex'} width={'100%'}>                        
                            <Grid item width={'50%'}>
                                <Button fullWidth size='large' variant='contained' color='primary' onClick={()=>setActiveStep(1)} endIcon={<NavigateNextIcon/>}>
                                    {buttonText}
                                </Button>
                            </Grid>
                        </Grid>
                    )}                
                </Paper>
            </Container>
        </div>
        )
    )
}