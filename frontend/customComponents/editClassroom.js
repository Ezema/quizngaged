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
import Snackbar from '@mui/material/Snackbar';

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
import { Alert } from '@mui/material';
import * as formValidator from '../customFunctions/formValidation.js';

const steps = [
  'Edit Classroom',
  'Confirm changes',
];

export default function EditClassroom(props){

    const [snackBar, setSnackBar] = React.useState({isOpen:false, message:'Test'})
    const listOfQuizzes = props.listOfQuizzes;
    const setListOfQuestions = props.setListOfQuestions;
    const editClassroomUID = props.editClassroomUID;

    
    const editClassroom = JSON.parse(localStorage.quizngagedUserData).classrooms[props.editClassroomUID]    

    const [statefuleditQuiz,setStatefuleditQuiz] = React.useState(editClassroom)
    const nonStatefuleditQuiz = editClassroom    

    const [step,setStep] = React.useState(0)
    const [entriesAreValid,setEntriesAreValid] = React.useState('true')
    const [mainButtonText,setMainButtonText] = React.useState('Next')
    
    const [userEntryClassroomName,setUserEntryClassroomName] = React.useState(editClassroom.name)

    const [statefulQuestions, setStatefulQuestions] = React.useState(null)
    const [statefulArrayOfQuestionSelected, setStatefulArrayOfQuestionSelected] = React.useState(editClassroom.questions)    

    const handleClassroomNameChange = (event)=>{
      let changedTitle = event.target.value;
      let isValid = formValidator.isValidMandatoryText(changedTitle);
      setUserEntryClassroomName(changedTitle);
      setEntriesAreValid(isValid);
    }
    const snackBarClose = () => {
      setSnackBar({isOpen:false,message:"", severity:""})
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
            props.setEditClassroomState(false)
            props.setTopBarTitle("My Classrooms")
        }else if(step==1){
            setStep(step-1)
            
            setMainButtonText('Next')
        }
    }

    const handleNextStep = ()=>{
      
      if (entriesAreValid) {
        if(step<2){
            if(step==0){
                (setStep(step+1));
                // save user changes temporary            
                setMainButtonText('Finish')                                    
            }
            else if(step==1){

                editClassroom.name = userEntryClassroomName                
        

                //create a copy from localstorage
                let copyOfQuizngagedUserData = JSON.parse(localStorage.quizngagedUserData)

                //save the edited questions in the copy                
                copyOfQuizngagedUserData.classrooms[props.editClassroomUID]=editClassroom                
            
                //replace the old data with the new data in localstorage                
                localStorage.setItem('quizngagedUserData',JSON.stringify(copyOfQuizngagedUserData))

                // call the backend to sync the local changes
                backendQuerySaveUserJSON(()=>{})

                props.setEditClassroomState(false)
                props.setTopBarTitle("My Classrooms")
                setStep(0)
            }            
        }
      }
      else {
        setSnackBar({isOpen:true, message:"Classroom name cannot be blank", severity:"error"}) 
      }
    }

    //This will be fetched from the API too
    const quizTopics = ['Geography','Mathematics']    
    
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
                                ('Edit Classroom') :
                            (
                                (step==1)?
                                    'Confirm' :
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
                                label={"Classroom UID: "+editClassroomUID.toString()}
                            />                
                        </Box>        
                        <Box marginBottom="1em">
                        <TextField     
                                required={step>0?false:true}
                                disabled={step>0?true:false}
                                InputProps={{
                                    readOnly: step>0?true:false,
                                  }}
                                fullWidth                   
                                label="Enter name"
                                placeholder="Classroom name"
                                onChange={(event)=>{handleClassroomNameChange(event)}}
                                value={userEntryClassroomName}
                                multiline
                                error={!entriesAreValid}
                                helperText={entriesAreValid?'':'Name cannot be blank'}
                            />
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
                        <Button fullWidth size='large' variant='contained' color='success' onClick={()=>handleNextStep()} endIcon={<NavigateNextIcon/>}>
                            {mainButtonText}
                        </Button>
                    </Grid>
                </Grid>
            </Container>
            <Snackbar
            open={snackBar.isOpen}
            autoHideDuration={6000}
            onClose={snackBarClose}
            >
              <Alert severity={snackBar.severity}>{snackBar.message}</Alert>
            </Snackbar>                

        </div>
    )
}