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
import BoltIcon from '@mui/icons-material/Bolt';

import QuestionAnswers from './questionAnswer.js';

import Autocomplete from '@mui/material/Autocomplete';

import { width } from '@mui/system';

import ListOfQuizzes from './listOfQuizzes.js';

import backendQueryCreateLaunchQuiz from '../customFunctions/backendQueries/backendQueryCreateLaunchQuiz.js';

const steps = [
  'Select one quiz',
  'Launch quiz',
];

export default function LaunchClassroomQuiz(props){

        
    const newOngoingLiveQuizUID = JSON.parse(localStorage.quizngagedUserData).classrooms[props.viewClassroomUID].ongoingLiveQuizzes.length;

    console.log("newOngoingLiveQuizUID: ",newOngoingLiveQuizUID)

    const newOngoingLiveQuiz = {id:newOngoingLiveQuizUID,quizSelected:null,eventDescription:null}

    const [statefulNewQuiz,setStatefulNewQuiz] = React.useState(newOngoingLiveQuiz)
    const nonStatefulnewQuiz = newOngoingLiveQuiz

    const [step,setStep] = React.useState(0)
    const [entriesAreValid,setEntriesAreValid] = React.useState('true')
    const [mainButtonText,setMainButtonText] = React.useState('Next')    

    const [userEntryEventDescription,setUserEntryEventDescription] = React.useState("")
    
    const [statefulQuizSelected, setStatefulQuizSelected] = React.useState(null)

    const handleEventDescriptionChange = (event)=>{
        setUserEntryEventDescription(event.target.value)        
    }

    const handlePreviousStep = ()=>{
        if(step==0){
            setStep(0)
            props.setLaunchClassroomQuizState(false)
        }else if(step==1){
            setStep(step-1)
            
            setMainButtonText('Next')
        }
    }

    const handleNextStep = ()=>{
        /* if(step<2 && entriesAreValid){ */
            if(step==0){
                (setStep(step+1));
                // save user changes temporary            
                setMainButtonText('Launch')                                    
            }
            else if(step==1){
                
                let parsedJson = JSON.parse(localStorage.quizngagedUserData);
                let parsedQuiz = parsedJson.quizzes[statefulQuizSelected];

                let launchQuiz = {
                  id: parsedQuiz.id,
                  eventDescription: userEntryEventDescription,
                  isDeleted: false,
                  quizTitle: parsedQuiz.quizTitle,
                  quizTopic: parsedQuiz.quizTopic,
                  questions: [],                
                };

                for(let i=0;i<parsedQuiz.questions.length;i++){
                  let questionIdx = parsedQuiz.questions[i];
                  let question = parsedJson.questions[questionIdx];
                  if (!question.isDeleted) {
                    launchQuiz.questions.push(question);
                    console.log("question #"+i, question);
                  }
                }

                let globalQuizngagedId = parsedJson.classrooms[props.viewClassroomUID].globalQuizngagedId;
                console.log("classroom="+globalQuizngagedId+" launched quiz: ", launchQuiz);
                backendQueryCreateLaunchQuiz(JSON.stringify(launchQuiz), globalQuizngagedId);

                props.setLaunchClassroomQuizState(false)
                setStep(0)
            }            
            
            
        /* } */
        
    }
  
    return(
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
                                ('Select one quiz from your list') :
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
                                label={"Quiz UID: "+newOngoingLiveQuizUID.toString()}
                            />                
                        </Box>        
                        <Box marginBottom="1em">
                            <TextField     
                                required={false}
                                InputProps={{
                                    readOnly: step>0?true:false,
                                  }}
                                fullWidth                   
                                label="Enter description for this event"
                                placeholder="Description"
                                onChange={(event)=>{handleEventDescriptionChange(event)}}
                                value={userEntryEventDescription}
                                multiline
                            />
                        </Box>                                
                        <Box marginBottom="0.1em">
                            <ListOfQuizzes statefulQuizSelected={statefulQuizSelected} setStatefulQuizSelected={setStatefulQuizSelected} step={step}></ListOfQuizzes>
                        </Box>                        
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
                        <Button fullWidth size='large' variant='contained' color='success' onClick={()=>handleNextStep()} 
                        startIcon={step==1?<BoltIcon/>:null}
                        endIcon={step==1?<BoltIcon/>:<NavigateNextIcon/>}>
                            {mainButtonText}
                        </Button>
                    </Grid>
                </Grid>
            </Container>                
        </div>
    )
}