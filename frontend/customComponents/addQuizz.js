import * as React from 'react';

/* mui libraries */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import TextField from '@mui/material/TextField';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Autocomplete from '@mui/material/Autocomplete';
import { Alert } from '@mui/material';

/* customFunctions */
import backendQuerySaveUserJSON from '../customFunctions/backendQueries/backendQuerySaveUserJSON.js';
import * as formValidator from '../customFunctions/formValidation.js';

/* customComponents */
import QuizQuestions from './quizQuestions.js';

const steps = [
  'Add Quiz',
  'Confirm Quiz data',
];

export default function AddQuiz(props){

    const [snackBar, setSnackBar] = React.useState({isOpen:false, message:'Test'})
    const setListOfQuizzes = props.setListOfQuizzes;
    const newQuizUID = props.newQuizUID;

    const newQuiz = {id:newQuizUID,quizTitle:null,quizTopic:null,isDeleted:false,questions:[]}

    const [statefulNewQuiz,setStatefulNewQuiz] = React.useState(newQuiz)

    const setAddQuizState = props.setAddQuizState;

    const [step,setStep] = React.useState(0)
    const [entriesAreValid,setEntriesAreValid] = React.useState('true')
    const [mainButtonText,setMainButtonText] = React.useState('Next')
    const [userEntryQuizTopic,setUserEntryQuizTopic] = React.useState("Geography")

    const [userEntryQuizTitle,setUserEntryQuizTitle] = React.useState(statefulNewQuiz.quizTitle)

    const [statefulQuestions, setStatefulQuestions] = React.useState(null)
    const [statefulArrayOfQuestionSelected, setStatefulArrayOfQuestionSelected] = React.useState([])
    const [serverRespondedToggle, setServerRespondedToggle] = React.useState(false)

    React.useEffect(()=>{
        if(serverRespondedToggle==true){
            props.setAddQuizState(false)
            props.setTopBarTitle("My Quizzes")
            setStep(0)
        }
    }, [serverRespondedToggle])

    const handleQuizTitleChange = (event)=>{
      let changedTitle = event.target.value;
      let isValid = formValidator.isValidMandatoryText(changedTitle);
      setUserEntryQuizTitle(changedTitle)
      setEntriesAreValid(isValid);
    }
    const snackBarClose = () => {
      setSnackBar({isOpen:false,message:"", severity:""})
    }

    // const calculateLastQuestionAnswerUID = (array)=>{        
    //     return array[array.length-1].id;
    // }
    // const getParentQuestionUID = (array)=>{
    //     return array[array.length-1].parentQuestionId;
    // }
    const handlePreviousStep = ()=>{
        if(step==0){
            setStep(0)
            props.setAddQuizState(false)
            props.setTopBarTitle("My Quizzes")
        }else if(step==1){
            setStep(step-1)
            
            setMainButtonText('Next')
        }
    }

    const handleNextStep = ()=>{
        let titleNotEntered = step == 0 && (userEntryQuizTitle == undefined || userEntryQuizTitle.length ==0);
        
        /* if(step<2 && entriesAreValid){ */
        if(step==0){
          if (!formValidator.isValidMandatoryText(userEntryQuizTitle)) {
            setEntriesAreValid(false);
            setSnackBar({isOpen:true, message:"Quiz title cannot be blank", severity:"error"}) 
            return false;
        }else if (!formValidator.isValidNonEmptyArray(statefulArrayOfQuestionSelected)) {
            setSnackBar({isOpen:true, message:"A quiz must include at least one question", severity:"error"})
            return false;
        }
            (setStep(step+1));
            // save user changes temporary            
            setMainButtonText('Finish')                                    
        }else if(step==1){
            newQuiz.quizTitle = userEntryQuizTitle
            newQuiz.quizTopic = userEntryQuizTopic
            newQuiz.questions = statefulArrayOfQuestionSelected

            console.log("saving new quizz", newQuiz)

            //create a copy from localstorage
            let copyOfQuizngagedUserData = JSON.parse(localStorage.quizngagedUserData)

            //save the edited questions in the copy
            copyOfQuizngagedUserData.quizzes.push(newQuiz)
            setListOfQuizzes(copyOfQuizngagedUserData.quizzes)
            //replace the old data with the new data in localstorage                
            localStorage.setItem('quizngagedUserData',JSON.stringify(copyOfQuizngagedUserData))

            // call the backend to sync the local changes
            backendQuerySaveUserJSON(()=>{setServerRespondedToggle(true)})

            }            
            
            
        /* } */
        
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
                                ('Add a new quiz') :
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
                                label={"Quiz UID: "+newQuizUID.toString()}
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
                                label="Enter a title for the quiz"
                                placeholder="Quiz title"
                                onChange={(event)=>{handleQuizTitleChange(event)}}
                                value={userEntryQuizTitle}
                                multiline
                                error={!entriesAreValid}
                                helperText={entriesAreValid?'':"Title cannot be blank"}
                            />
                        </Box>
                        <Box marginBottom="1em">
                            <Autocomplete
                                disabled={step>0?true:false}                                
                                value={userEntryQuizTopic}
                                onChange={(event, newValue) => {
                                setUserEntryQuizTopic(newValue)
                                }}
                                disableClearable
                                inputValue={userEntryQuizTopic}
                                onInputChange={(event, newInputValue) => {
                                setUserEntryQuizTopic(newInputValue)
                                }}
                                disablePortal
                                options={quizTopics}    
                                fullWidth
                                renderInput={(questionOption) => <TextField {...questionOption} 
                                label="Quiz Category"
                            />}
                            />
                        </Box>        
                        <Box marginBottom="0.1em">
                            <QuizQuestions statefulQuestions={statefulQuestions} setStatefulQuestions={setStatefulQuestions} statefulArrayOfQuestionSelected={statefulArrayOfQuestionSelected} setStatefulArrayOfQuestionSelected={setStatefulArrayOfQuestionSelected} step={step}></QuizQuestions>
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