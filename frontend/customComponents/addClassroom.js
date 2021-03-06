import * as React from 'react';

/* mui libraries */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import TextField from '@mui/material/TextField';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import CircularProgress from '@mui/material/CircularProgress';

/* customFunctions */
import backendQuerySaveUserJSON from '../customFunctions/backendQueries/backendQuerySaveUserJSON.js';
import backendQueryCheckClassroomUniqueIDIsValid from '../customFunctions/backendQueries/backendQueryCheckClassroomUniqueIDIsValid.js'
import backendQuerySaveNewUniqueClassroom from '../customFunctions/backendQueries/backendQuerySaveNewUniqueClassroom.js'
import * as formValidator from '../customFunctions/formValidation.js';
import findArrayIndex from '../customFunctions/findArrayIndex.js';


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

    const newClassroom = {id:newClassroomUID,globalQuizngagedId:null,name:null,classroomStatistics:{},classroomSettings:null,isDeleted:false,pastQuizzes:[],ongoingLiveQuizzes:[]}

    const [statefulNewQuiz,setStatefulNewQuiz] = React.useState(newClassroom)

    const [snackBar, setSnackBar] = React.useState({isOpen:false, message:'Test'})
    const [step,setStep] = React.useState(0)
    const [mainButtonText,setMainButtonText] = React.useState('Next')

    const [userEntryClassroomSettings,setUserEntryClassroomSettings] = React.useState({})

    const [userEntryClassroomName,setUserEntryClassroomName] = React.useState(statefulNewQuiz.name)    

    const [statefulArrayOfPastQuizzes, setStatefulArrayOfPastQuizzes] = React.useState([])
    const [statefulArrayOfOngoingLiveQuizzes, setStatefulArrayOfOngoingLiveQuizzes] = React.useState([])


    const [studentClassroomUniqueUID, setStudentClassroomUniqueUID] = React.useState(null)
    const [studentClassroomDescription, setStudentClassroomDescription] = React.useState(null)
    const [checkingValidClassroom, setCheckingValidClassroom] = React.useState(false)
    const [serverResponseForClassroomIDValidity, setServerResponseForClassroomIDValidity] = React.useState("nada")
    
    const [alreadyRegistered, setAlreadyRegistered] = React.useState(false)
    const [showError, setShowError] = React.useState(false)

    
    const handleStudentClassroomUniqueUIDChange = (event)=>{
        let changedUID = event.target.value;
        let isValid = formValidator.isValidMandatoryText(changedUID) && formValidator.isValidInteger(String(changedUID));
        setStudentClassroomUniqueUID(changedUID);
        setShowError(!isValid);
        setAlreadyRegistered(false)
    }
    

    const handleStudentClassroomDescriptionChange = (event)=>{
        setStudentClassroomDescription(event.target.value)        
    }

    const handleClassroomNameChange = (event)=>{
      let changedTitle = event.target.value;
      let isValid = formValidator.isValidMandatoryText(changedTitle);
      setUserEntryClassroomName(changedTitle)
      setShowError(!isValid);
    }
    const snackBarClose = () => {
      setSnackBar({isOpen:false,message:"", severity:""})
    }    

    const handlePreviousStep = ()=>{
        if(step==0){
            setStep(0)
            props.setAddClassroomState(false)
            props.setTopBarTitle("My Classrooms")
        }else if(step==1){
            setStep(step-1)
            setServerResponseForClassroomIDValidity("nada")
            setMainButtonText('Next')
        }
    }
    
    const handleClassroomIDisValid = ()=>{ 
        if (findArrayIndex(JSON.parse(localStorage.quizngagedUserData).classrooms, "globalQuizngagedId", studentClassroomUniqueUID, true)){
            console.log("there is a class already registered")
            setAlreadyRegistered(true)
            setShowError(true)
        } else { 
            setAlreadyRegistered(false)
            console.log("there is room for registration")
            setCheckingValidClassroom(true)
            backendQueryCheckClassroomUniqueIDIsValid({callback:setServerResponseForClassroomIDValidity},studentClassroomUniqueUID,true)
        }     
        
        
    }

    const handleNextStep = ()=>{
        let teacherAddIncomplete = step == 0 && 
            !props.userIsStudent && 
            !formValidator.isValidMandatoryText(userEntryClassroomName);

        if (teacherAddIncomplete) {
            setShowError(true)
        }

        if(step<2 && !showError && !teacherAddIncomplete){ 
            if(props.userIsStudent){
                if(step==0){
                    if(studentClassroomUniqueUID==null || studentClassroomUniqueUID==undefined || studentClassroomUniqueUID==="" || isNaN(parseFloat(studentClassroomUniqueUID))){
                        setShowError(true)
                    }else{                        
                        handleClassroomIDisValid()
                    }                    
                }
                else if(step==1){
                    setCheckingValidClassroom(true)
                    backendQueryCheckClassroomUniqueIDIsValid({callback:setServerResponseForClassroomIDValidity},studentClassroomUniqueUID, false)
                }
            }else{
                if(step==0){                                        
                    (setStep(step+1));                    
                    setMainButtonText('Finish')                    
                }
                else if(step==1){
    
                    newClassroom.name = userEntryClassroomName
                    newClassroom.classroomSettings = userEntryClassroomSettings
                    newClassroom.pastQuizzes = statefulArrayOfPastQuizzes
                    newClassroom.ongoingLiveQuizzes = statefulArrayOfOngoingLiveQuizzes

                    backendQuerySaveNewUniqueClassroom(newClassroomUID,JSON.stringify(newClassroom))                    
    
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
                    props.setTopBarTitle("My Classrooms")
                    setStep(0)
                }
            }                                    
            
        }
        else {
          setSnackBar({isOpen:true, message:props.userIsStudent?"Invalid classroom code entered (or blank)":"Classroom name cannot be blank", severity:"error"}) 
        }
          
    }

    React.useEffect(()=>{
        if(checkingValidClassroom){
            if(serverResponseForClassroomIDValidity){
                if(step == 0){
                    console.log('got valid id');
                    setStep(step+1)
                    setMainButtonText('Finish')
                    setCheckingValidClassroom(false)
                    setServerResponseForClassroomIDValidity("nada")
                }
                if(step==1){
                    props.setAddClassroomState(false)
                    setStep(0)
                    setCheckingValidClassroom(false)
                    setServerResponseForClassroomIDValidity("nada")
                }
            }else{
                console.log('got invalid id');
                setCheckingValidClassroom(false)
                setShowError(true)
                setServerResponseForClassroomIDValidity("nada")
            }
        }
    },[serverResponseForClassroomIDValidity,])
    
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
                        <Box marginTop="1em">                                  {checkingValidClassroom?(
                            <Box margin="5em" display={'flex'} justifyContent={'center'}>
                                <CircularProgress></CircularProgress>
                            </Box>
                            )
                            :
                            (
                                <div>
                                <Box marginBottom="1em">
                                    <TextField     
                                        required={step>0?false:true}
                                        InputProps={{
                                            disabled: step>0?true:false,
                                            inputMode: 'numeric', pattern: '[0-9]*'
                                        }}
                                        fullWidth                                               
                                        label="Enter the teacher-provided classroom code"
                                        placeholder="Classroom code"
                                        onChange={(event)=>{handleStudentClassroomUniqueUIDChange(event)}}
                                        value={studentClassroomUniqueUID}
                                        error={showError}
                                        helperText={showError?(alreadyRegistered?'You are already registered for this course':'Enter the code provided by your teacher'):''}
                                        multiline
                                        type='number'
                                    />
                                </Box>
                                <Box marginBottom="1em">
                                    <TextField     
                                        required={step>0?false:false}
                                        InputProps={{
                                            disabled: step>0?true:false,
                                        }}
                                        fullWidth                   
                                        label="Enter a description for this classroom"
                                        placeholder="Classroom description"
                                        onChange={(event)=>{handleStudentClassroomDescriptionChange(event)}}
                                        value={studentClassroomDescription}
                                        multiline
                                    />
                                </Box>
                                </div>
                            )
                            }
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
                            <Button fullWidth InputProps={{disabled: showError?true:false}} size='large' variant='contained' color='success' onClick={()=>handleNextStep()} endIcon={<NavigateNextIcon/>}>
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
                                  error={showError?true:false}
                                  helperText={showError?'Name cannot be blank':''}
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
                <Snackbar
                open={snackBar.isOpen}
                autoHideDuration={6000}
                onClose={snackBarClose}
                >
                  <Alert severity={snackBar.severity}>{snackBar.message}</Alert>
                </Snackbar>                
            </div>
            )        
    )
}