import * as React from 'react';
import Link from 'next/link'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
//import Stack from '@mui/material/Stack';

import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import ListIcon from '@mui/icons-material/List';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import TextField from '@mui/material/TextField';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';


import QuestionAnswers from './questionAnswer.js';

import Autocomplete from '@mui/material/Autocomplete';

import backendQuerySaveUserJSON from '../customFunctions/backendQueries/backendQuerySaveUserJSON.js';

import { width } from '@mui/system';

import QuizQuestions from './quizQuestions.js';





export default function AddClassroom(props){

    let steps;
    if(props.userIsStudent){
        steps = [
            'Join Classroom',
            'Validate Classroom data',
        ];
    }else{
        steps = [
            'Add Classroom',
            'Confirm Classroom data',            
        ];
    }
    
    const newClassroomUID = props.newClassroomUID;

    const newClassroom = {id:newClassroomUID,name:null,classroomStatistics:{},classroomSettings:null,isDeleted:false,pastQuizzes:[],ongoingLiveQuizzes:[]}

    const [statefulNewQuiz,setStatefulNewQuiz] = React.useState(newClassroom)
    const nonStatefulnewQuiz = newClassroom

    const setAddClassroomState = props.setAddClassroomState;

    const [step,setStep] = React.useState(0)
    const [entriesAreValid,setEntriesAreValid] = React.useState('true')
    const [mainButtonText,setMainButtonText] = React.useState('Next')

    const [userEntryClassroomSettings,setUserEntryClassroomSettings] = React.useState({})

    const [userEntryClassroomName,setUserEntryClassroomName] = React.useState(statefulNewQuiz.name)    

    const [statefulQuestions, setStatefulQuestions] = React.useState(null)
    const [statefulArrayOfPastQuizzes, setStatefulArrayOfPastQuizzes] = React.useState([])
    const [statefulArrayOfOngoingLiveQuizzes, setStatefulArrayOfOngoingLiveQuizzes] = React.useState([])


    const [studentClassroomUniqueUID, setStudentClassroomUniqueUID] = React.useState(null)
    const [studentClassroomDescription, setStudentClassroomDescription] = React.useState(null)

    const [showError, setShowError] = React.useState(false)

    
    const handleStudentClassroomUniqueUIDChange = (event)=>{
        setShowError(false)
        setStudentClassroomUniqueUID(event.target.value)
    }
    

    const handleStudentClassroomDescriptionChange = (event)=>{
        setStudentClassroomDescription(event.target.value)        
    }

    const handleClassroomTitleChange = (event)=>{
        setUserEntryClassroomName(event.target.value)        
    }

    const calculateLastQuestionAnswerUID = (array)=>{        
        return array[array.length-1].id;
    }
    const getParentQuestionUID = (array)=>{
        return array[array.length-1].parentQuestionId;
    }
    

    const handlePreviousStep = ()=>{
        if(step==0){
            setStep(0)
            props.setAddClassroomState(false)
        }else if(step==1){
            setStep(step-1)
            
            setMainButtonText('Next')
        }
    }

    const handleNextStep = ()=>{
        /* if(step<2 && entriesAreValid){ */
            if(step==0){
                if(studentClassroomUniqueUID==null || studentClassroomUniqueUID==undefined || studentClassroomUniqueUID==="" || isNaN(parseFloat(studentClassroomUniqueUID))){
                    setShowError(true)
                }else{   
                        (setStep(step+1));                    
                        setMainButtonText('Finish')
                }
                
            }
            else if(step==1){

                newClassroom.name = userEntryClassroomName
                newClassroom.classroomSettings = userEntryClassroomSettings
                newClassroom.pastQuizzes = statefulArrayOfPastQuizzes
                newClassroom.ongoingLiveQuizzes = statefulArrayOfOngoingLiveQuizzes

                console.log("saving new classroom", newClassroom)

                //create a copy from localstorage
                let copyOfQuizngagedUserData = JSON.parse(localStorage.quizngagedUserData)

                //save the edited pastQuizzes in the copy
                copyOfQuizngagedUserData.classrooms.push(newClassroom)
            
                //replace the old data with the new data in localstorage                
                localStorage.setItem('quizngagedUserData',JSON.stringify(copyOfQuizngagedUserData))

                // call the backend to sync the local changes
                backendQuerySaveUserJSON(()=>{})

                props.setAddClassroomState(false)
                setStep(0)
            }            
            
            
        /* } */
        
    }
    
    return(
            (props.userIsStudent)?(
            <div>
                <Stepper activeStep={step}>
                    {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
                <Container >
                    <Box style={{background:'white', bottom:'10px'}}>
                        <Box marginTop="2em">
                            <Typography variant='h6'>
                                {(step==0)?
                                    ('Join a Classroom') :
                                (
                                    (step==1)?
                                        'Confirm the data' :
                                        null
                                        
                                )}
                            </Typography>
                        </Box>
                        <Box marginTop="1em">                                  
                            <Box marginBottom="1em">
                                <TextField     
                                    required={step>0?false:true}
                                    InputProps={{
                                        readOnly: step>0?true:false,
                                    }}
                                    fullWidth                                               
                                    error={showError}        
                                    label="Enter the teacher-provided classroom code"
                                    placeholder="Classroom code"
                                    onChange={(event)=>{handleStudentClassroomUniqueUIDChange(event)}}
                                    value={studentClassroomUniqueUID}
                                    multiline
                                />
                            </Box>
                            <Box marginBottom="1em">
                                <TextField     
                                    required={step>0?false:false}
                                    InputProps={{
                                        readOnly: step>0?true:false,
                                    }}
                                    fullWidth                   
                                    label="Enter a description for this classroom"
                                    placeholder="Classroom description"
                                    onChange={(event)=>{handleStudentClassroomDescriptionChange(event)}}
                                    value={studentClassroomDescription}
                                    multiline
                                />
                            </Box>
                            {/* <Box marginBottom="0.1em">
                                <QuizQuestions statefulQuestions={statefulQuestions} setStatefulQuestions={setStatefulQuestions} statefulArrayOfPastQuizzes={statefulArrayOfPastQuizzes} setStatefulArrayOfPastQuizzes={setStatefulArrayOfPastQuizzes} step={step}></QuizQuestions>
                            </Box> */}                        
                        </Box>
                    </Box>
                </Container>
                <Container>
                    <Grid Container columns={2} alignContent={'center'} justifyContent={'center'} display={'flex'} width={'100%'}>
                        <Grid item paddingRight={'2em'}     width={'50vw'}>
                            <Button fullWidth size='large' variant='contained' color='success' onClick={()=>handlePreviousStep()} startIcon={<NavigateBeforeIcon/>}>
                                Back
                            </Button>
                        </Grid>
                        <Grid item paddingLeft={'2em'} width={'50vw'}>
                            <Button fullWidth size='large' variant='contained' color='success' onClick={()=>handleNextStep()} endIcon={<NavigateNextIcon/>}>
                                {mainButtonText}
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            )
            :
            (
            <div>
                <Stepper activeStep={step}>
                        {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                        ))}
                    </Stepper>         
                
                <Container >
                    <Box style={{background:'white', bottom:'10px'}}>
                        <Box marginTop="2em">
                            <Typography variant='h6'>
                                {(step==0)?
                                    ('Add a new Classroom') :
                                (
                                    (step==1)?
                                        'Confirm the data' :
                                        null
                                        
                                )}
                            </Typography>
                        </Box>
                        <Box marginTop="1em">
                            <Box marginBottom="1em">
                                {/* <Typography variant='subtitle1' padding={0.5} style={{color:'gray'}}>
                                    Question UID
                                </Typography> */}
                                <TextField     
                                    margin={'0.5em'}
                                    disabled
                                    fullWidth 
                                    label={"Quiz UID: "+newClassroomUID.toString()}
                                />                
                            </Box>        
                            <Box marginBottom="1em">
                                <TextField     
                                    required={step>0?false:true}
                                    InputProps={{
                                        readOnly: step>0?true:false,
                                    }}
                                    fullWidth                   
                                    label="Enter a name for the classroom"
                                    placeholder="Classroom name"
                                    onChange={(event)=>{handleClassroomTitleChange(event)}}
                                    value={userEntryClassroomName}
                                    multiline
                                />
                            </Box>
                            {/* <Box marginBottom="0.1em">
                                <QuizQuestions statefulQuestions={statefulQuestions} setStatefulQuestions={setStatefulQuestions} statefulArrayOfPastQuizzes={statefulArrayOfPastQuizzes} setStatefulArrayOfPastQuizzes={setStatefulArrayOfPastQuizzes} step={step}></QuizQuestions>
                            </Box> */}                        
                        </Box>
                    </Box>
                </Container>
                <Container>
                    <Grid Container columns={2} alignContent={'center'} justifyContent={'center'} display={'flex'} width={'100%'}>
                        <Grid item paddingRight={'2em'}     width={'50vw'}>
                            <Button fullWidth size='large' variant='contained' color='success' onClick={()=>handlePreviousStep()} startIcon={<NavigateBeforeIcon/>}>
                                Back
                            </Button>
                        </Grid>
                        <Grid item paddingLeft={'2em'} width={'50vw'}>
                            <Button fullWidth size='large' variant='contained' color='success' onClick={()=>handleNextStep()} endIcon={<NavigateNextIcon/>}>
                                {mainButtonText}
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            )        
    )
}