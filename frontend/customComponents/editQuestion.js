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
import Alert from '@mui/material/Alert';
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

import { width } from '@mui/system';

import backendQuerySaveUserJSON from '../customFunctions/backendQueries/backendQuerySaveUserJSON.js';
import * as formValidator from '../customFunctions/formValidation.js';
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';

const steps = [
  'Add base question',
  'Add easier version',
  'Add harder version',
];

export default function EditQuestion(props){    

    const editedQuestionUID = props.QuestionUIDToEdit;
    const [snackBar, setSnackBar] = React.useState({isOpen:false, message:'Test'})
    const editedQuestion = props.questionToEdit    

    const [statefulEditedQuestion,setStatefulEditedQuestion] = React.useState(editedQuestion)
    let nonStatefulEditedQuestion = editedQuestion

    const [statefulArrayOfQuestionAnswers,setStatefulArrayOfQuestionAnswers] = React.useState(statefulEditedQuestion.questionBaselineAnswers)
    
    const setEditQuestionState = props.setEditQuestionState;

    const [step,setStep] = React.useState(0)
    const [entriesAreValid,setEntriesAreValid] = React.useState('true')
    const [questionTypeEntriesAreValid,setQuestionTypeEntriesAreValid] = React.useState('true')
    const [mainButtonText,setMainButtonText] = React.useState('Next')
    const [timerMinutesEntries,setTimerMinutesEntries] = React.useState(true)
    const [timerSecondsEntries,setTimerSecondsEntries] = React.useState(true)

    const [userEntryQuestionType,setUserEntryQuestionType] = React.useState(statefulEditedQuestion.questionType)
    const [userEntryBaselineQuestionBody,setUserEntryBaselineQuestionBody] = React.useState(statefulEditedQuestion.questionBaselineBody)
    const [userEntryEasierQuestionBody,setUserEntryEasierQuestionBody] = React.useState(statefulEditedQuestion.questionEasierBody)
    const [userEntryHarderQuestionBody,setUserEntryHarderQuestionBody] = React.useState(statefulEditedQuestion.questionHarderBody)
    const [userEntryBaselineTimerMinutes, setUserEntryBaselineTimerMinutes] = React.useState(statefulEditedQuestion.questionBaselineTimer.minutes)
    const [userEntryEasierTimerMinutes, setUserEntryEasierTimerMinutes] = React.useState(statefulEditedQuestion.questionEasierTimer.minutes)
    const [userEntryHarderTimerMinutes, setUserEntryHarderTimerMinutes] = React.useState(statefulEditedQuestion.questionHarderTimer.minutes)
    const [userEntryBaselineTimerSeconds, setUserEntryBaselineTimerSeconds] = React.useState(statefulEditedQuestion.questionBaselineTimer.seconds)
    const [userEntryEasierTimerSeconds, setUserEntryEasierTimerSeconds] = React.useState(statefulEditedQuestion.questionEasierTimer.seconds)
    const [userEntryHarderTimerSeconds, setUserEntryHarderTimerSeconds] = React.useState(statefulEditedQuestion.questionHarderTimer.seconds)
    const [baselineTimer, setBaselineTimer] = React.useState(statefulEditedQuestion.questionBaselineTimer.isAssigned)
    const [easyTimer, setEasyTimer] = React.useState(statefulEditedQuestion.questionEasierTimer.isAssigned)
    const [hardTimer, setHardTimer] = React.useState(statefulEditedQuestion.questionHarderTimer.isAssigned)
    const [timer, setTimer] = React.useState(false)

    const questionTypes = ['Multiple Choice', 'Text Response', 'Binary Question'];
    const multipleChoiceQuestionIdx = 0;
    const textQuestionIdx = 1;
    const binaryQuestionIdx = 2;

    const activateTimer = (event)=>{
        if(step == 0){
            if(timer && baselineTimer){
                setTimer(false)
                setBaselineTimer(false)
            }else{
                setTimer(true)
                setBaselineTimer(true)
            }
            
        }else if(step==1){
            if(timer && easyTimer){
                setTimer(false)
                setEasyTimer(false)
            }else{
                setTimer(true)
                setEasyTimer(true)
            }
        }else if(step == 2){
            if(timer && hardTimer){
                setTimer(false)
                setHardTimer(false)
            }else{
                setTimer(true)
                setHardTimer(true)
            }
        }        
        console.log("base", baselineTimer, "time", timer)
    }

    const handleTimerMinutesChange = (event, questionDifficulty) =>{
        let changedBody = event.target.value;
        let isValid = formValidator.isValidMandatoryText(changedBody);
        if(questionDifficulty==0){  
            setUserEntryBaselineTimerMinutes(changedBody)
            setTimerMinutesEntries(isValid);
        }else if(questionDifficulty==1){
            setUserEntryEasierTimerMinutes(changedBody)
            setTimerMinutesEntries(isValid);
        }else if(questionDifficulty==1){
            setTimerMinutesEntries(isValid);
            setUserEntryHarderTimerMinutes(changedBody)
        }
    }

    const handleTimerSecondsChange = (event, questionDifficulty) =>{
        let changedBody = event.target.value;
        let isValid = formValidator.isValidMandatoryText(changedBody);

        if(questionDifficulty==0){  
            setUserEntryBaselineTimerSeconds(changedBody)
            setTimerSecondsEntries(isValid);
        }else if(questionDifficulty==1){
            setUserEntryEasierTimerSeconds(changedBody)
            setTimerSecondsEntries(isValid);
        }else if(questionDifficulty==1){
            setUserEntryHarderTimerSeconds(changedBody)
            setTimerSecondsEntries(isValid);
        }
    }

    const handleQuestionBodyChange = (event, questionDifficulty)=>{
        let changedBody = event.target.value;
        let isValid = formValidator.isValidMandatoryText(changedBody);
        if(questionDifficulty==0){  
            setUserEntryBaselineQuestionBody(changedBody)
            setEntriesAreValid(isValid);
        }else if(questionDifficulty==1){
            setUserEntryEasierQuestionBody(changedBody)
            if(statefulArrayOfQuestionAnswers.length == 0){
                setEntriesAreValid(true);
            }else{
                setEntriesAreValid(isValid);
            }
        }else if(questionDifficulty==2){
            setUserEntryHarderQuestionBody(changedBody)
            if(statefulArrayOfQuestionAnswers.length == 0){
                setEntriesAreValid(true);
            }else{
                setEntriesAreValid(isValid);
            }
        }
    }

    const calculateLastQuestionAnswerUID = (array)=>{        
        if(array.length != 0){
            return array[array.length-1].id;
        }else{
            return 0;
        }
    }
    const getParentQuestionUID = (array)=>{
        if(array.length != 0){
            return array[array.length-1].parentQuestionId;
        }else{
           return editedQuestionUID
        } 
    }
    
    const handleOnlyNum = (e) => {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 10) {
            this.setState({ value: onlyNums });
        } else if (onlyNums.length === 10) {
            const number = onlyNums.replace(
                /(\d{3})(\d{3})(\d{4})/,
                '($1) $2-$3'
            );
            this.setState({ value: number });
        }
    }

    const handleEditedQuestionAnswer = () => {
        
        const createNewIndex = calculateLastQuestionAnswerUID(statefulArrayOfQuestionAnswers) + 1;
        const parentQuestionUID = getParentQuestionUID(statefulArrayOfQuestionAnswers);

        let copyArray = JSON.parse(JSON.stringify(statefulArrayOfQuestionAnswers))

        copyArray.push({id:createNewIndex,parentQuestionId:parentQuestionUID,body:'', isCorrect:false})            

        setStatefulArrayOfQuestionAnswers(copyArray)
    }

    const handlePreviousStep = ()=>{

        if(step==0){
            (setEditQuestionState(false),setStep(0))
        }
        else if(step==1){
            if(baselineTimer){
                setTimer(true)
            }          
            setStep(step-1)

            // save user changes temporary
            let copyOfEasierQuestion = JSON.parse(JSON.stringify(userEntryEasierQuestionBody))            
            let copyOfQuestionType = JSON.parse(JSON.stringify(userEntryQuestionType))
            let copyOfEasierAnswersArray = JSON.parse(JSON.stringify(statefulArrayOfQuestionAnswers))                     
            let copyOfEditedQuestion = JSON.parse(JSON.stringify(statefulEditedQuestion))
            let copyOfEasierTimerAssigned = JSON.parse(JSON.stringify(easyTimer))
            let copyOfEasierTimerMinutes = JSON.parse(JSON.stringify(userEntryEasierTimerMinutes))
            let copyOfEasierTimerSeconds = JSON.parse(JSON.stringify(userEntryEasierTimerSeconds))

            copyOfEditedQuestion.questionType= copyOfQuestionType
            copyOfEditedQuestion.questionEasierBody= copyOfEasierQuestion
            //mapping correct answers to each question
            copyOfEditedQuestion.questionEasierAnswers = copyOfEasierAnswersArray
            copyOfEditedQuestion.questionEasierTimer.isAssigned = copyOfEasierTimerAssigned
            copyOfEditedQuestion.questionEasierTimer.minutes = copyOfEasierTimerMinutes
            copyOfEditedQuestion.questionEasierTimer.seconds = copyOfEasierTimerSeconds

            setStatefulEditedQuestion(JSON.parse(JSON.stringify(copyOfEditedQuestion)))
            nonStatefulEditedQuestion = JSON.parse(JSON.stringify(copyOfEditedQuestion))            

            setStatefulArrayOfQuestionAnswers(JSON.parse(JSON.stringify(statefulEditedQuestion.questionBaselineAnswers)))
        }
        else if(step==2){
            if(easyTimer){
                setTimer(true)
            } 
            setStep(step-1)

            let copyOfHarderQuestion = JSON.parse(JSON.stringify(userEntryHarderQuestionBody))
            let copyOfQuestionType = JSON.parse(JSON.stringify(userEntryQuestionType))
            let copyOfHarderAnswersArray = JSON.parse(JSON.stringify(statefulArrayOfQuestionAnswers))
            let copyOfEditedQuestion = JSON.parse(JSON.stringify(statefulEditedQuestion))
            let copyOfHarderTimerAssigned = JSON.parse(JSON.stringify(hardTimer))
            let copyOfHarderTimerMinutes = JSON.parse(JSON.stringify(userEntryHarderTimerMinutes))
            let copyOfHarderTimerSeconds = JSON.parse(JSON.stringify(userEntryHarderTimerSeconds))

            copyOfEditedQuestion.questionType= copyOfQuestionType
            copyOfEditedQuestion.questionHarderBody= copyOfHarderQuestion
            copyOfEditedQuestion.questionHarderAnswers = copyOfHarderAnswersArray
            copyOfEditedQuestion.questionEasierTimer.isAssigned = copyOfHarderTimerAssigned
            copyOfEditedQuestion.questionHarderTimer.minutes = copyOfHarderTimerMinutes
            copyOfEditedQuestion.questionHarderTimer.seconds = copyOfHarderTimerSeconds

            setStatefulEditedQuestion(JSON.parse(JSON.stringify(copyOfEditedQuestion)))
            nonStatefulEditedQuestion = JSON.parse(JSON.stringify(copyOfEditedQuestion))
            
            setStatefulArrayOfQuestionAnswers(statefulEditedQuestion.questionEasierAnswers)
            setMainButtonText('Next')
        }
    }
    const isQuestionValid = () => {

        let answers = statefulArrayOfQuestionAnswers

        if(!formValidator.isValidMandatoryText(userEntryBaselineQuestionBody)){
            return false;
        }

        if(!formValidator.isValidEntryChoice(userEntryQuestionType, questionTypes)) {
            setSnackBar({isOpen:true, message:"Question type is invalid", severity:"error"}) 
            setQuestionTypeEntriesAreValid(false);
            return false;
        }

        if(userEntryQuestionType == questionTypes[textQuestionIdx]){
           // no need for option checking 
           return true;
        }

        if(userEntryQuestionType == questionTypes[multipleChoiceQuestionIdx]){
          if(answers.length<2){
             setSnackBar({isOpen:true, message:"Multichoice questions should have at least 2 possible answers", severity:"error"}) 
             return false;
        }
          }
   
        if (userEntryQuestionType == questionTypes[binaryQuestionIdx]){
           if(answers.length!=2){
              setSnackBar({isOpen:true, message:"Binary questions should have exactly 2 possible answers", severity:"error"}) 
              return false;
          } 
        }

        var correctAnswerIsSet = false
        for(let i = 0; i<answers.length; i++){
           let el = answers[i]
           if(el.body=='') {
              setSnackBar({isOpen:true, message:"Empty answers are not allowed", severity:"error"})
              return false
           } 
          if ( el.isCorrect  == true ){
              correctAnswerIsSet=true
          }
        }
        if(!correctAnswerIsSet){
              setSnackBar({isOpen:true, message:"Please select the correct answer", severity:"error"})
              return false
        }
        

     
        return true;
    }
    const snackBarClose = () => {
        setSnackBar({isOpen:false,message:"", severity:""})
    }



    const handleNextStep = ()=>{
        /* if(step<2 && entriesAreValid){ */
            let quizBodyNotEntered = !formValidator.isValidMandatoryText(userEntryBaselineQuestionBody);
            let easierQuizBodyNotEntered = !formValidator.isValidMandatoryText(userEntryEasierQuestionBody);
            let harderQuizBodyNotEntered = !formValidator.isValidMandatoryText(userEntryHarderQuestionBody);

            if(step==0){
                if(!isQuestionValid()){
                    if(quizBodyNotEntered){
                        setEntriesAreValid(false);
                        setSnackBar({isOpen:true, message:"Question body cannot be blank", severity:"error"}) 
                    }
                    return false;
                }
                if(baselineTimer && (userEntryBaselineTimerMinutes == "" || userEntryBaselineTimerMinutes == null)){
                    setTimerMinutesEntries(false);
                    setSnackBar({isOpen:true, message:"Timer value cannot be blank", severity:"error"}) 
                    return false;
                }else if(baselineTimer && (userEntryBaselineTimerSeconds == "" || userEntryBaselineTimerSeconds == null)){
                    setTimerSecondsEntries(false);
                    setSnackBar({isOpen:true, message:"Timer value cannot be blank", severity:"error"}) 
                    return false;
                }
                (setStep(step+1));
                if(userEntryEasierTimerMinutes == "" || userEntryEasierTimerMinutes == null || !easyTimer){
                    setTimer(false)
                }else{
                    setTimer(true)
                }
                // save user changes temporary
                                
                let copyOfBaselineQuestion = JSON.parse(JSON.stringify(userEntryBaselineQuestionBody))
                let copyOfQuestionType = JSON.parse(JSON.stringify(userEntryQuestionType))
                let copyOfBaselineAnswersArray = JSON.parse(JSON.stringify(statefulArrayOfQuestionAnswers))                    
                let copyOfEditedQuestion = JSON.parse(JSON.stringify(statefulEditedQuestion))
                let copyOfBaselineTimerAssigned = JSON.parse(JSON.stringify(baselineTimer))
                let copyOfBaselineTimerMinutes = JSON.parse(JSON.stringify(userEntryBaselineTimerMinutes))
                let copyOfBaselineTimerSeconds = JSON.parse(JSON.stringify(userEntryBaselineTimerSeconds))

                copyOfEditedQuestion.questionType= copyOfQuestionType
                copyOfEditedQuestion.questionBaselineBody= copyOfBaselineQuestion
                copyOfEditedQuestion.questionBaselineAnswers = copyOfBaselineAnswersArray
                copyOfEditedQuestion.questionBaselineTimer.isAssigned = copyOfBaselineTimerAssigned
                copyOfEditedQuestion.questionBaselineTimer.minutes = copyOfBaselineTimerMinutes
                copyOfEditedQuestion.questionBaselineTimer.seconds = copyOfBaselineTimerSeconds


                setStatefulEditedQuestion(copyOfEditedQuestion)
                nonStatefulEditedQuestion = JSON.parse(JSON.stringify(copyOfEditedQuestion))

                // change 'active' array of question answers being edited by the user
                setStatefulArrayOfQuestionAnswers(statefulEditedQuestion.questionEasierAnswers)
            }
            else if(step==1){

                 // easy question has body  so we need to perform  validation
                if(userEntryEasierQuestionBody && !isQuestionValid()){
                    return false;
                }
                
                if(statefulArrayOfQuestionAnswers.length != 0 && easierQuizBodyNotEntered){
                    setEntriesAreValid(false);
                    setSnackBar({isOpen:true, message:"Question body cannot be blank", severity:"error"}) 
                    return false
                }else if(statefulArrayOfQuestionAnswers.length == 0){
                    setEntriesAreValid(true);
                }
                if(easyTimer && (userEntryEasierTimerMinutes == "" || userEntryEasierTimerMinutes == null)){
                    setTimerMinutesEntries(false);
                    setSnackBar({isOpen:true, message:"Timer value cannot be blank", severity:"error"}) 
                    return false;
                }else if(easyTimer && (userEntryEasierTimerSeconds == "" || userEntryEasierTimerSeconds == null)){
                    setTimerSecondsEntries(false);
                    setSnackBar({isOpen:true, message:"Timer value cannot be blank", severity:"error"}) 
                    return false;
                }
                setStep(step+1)   
                if(userEntryHarderTimerMinutes == "" || userEntryHarderTimerMinutes == null || !hardTimer){
                    setTimer(false)
                }else{
                    setTimer(true)
                }             
                // save user changes temporary
                
                let copyOfEasierQuestion = JSON.parse(JSON.stringify(userEntryEasierQuestionBody))
                let copyOfQuestionType = JSON.parse(JSON.stringify(userEntryQuestionType))
                let copyOfEasierAnswersArray = JSON.parse(JSON.stringify(statefulArrayOfQuestionAnswers))     
                let copyOfEditedQuestion = JSON.parse(JSON.stringify(statefulEditedQuestion))
                let copyOfEasierTimerAssigned = JSON.parse(JSON.stringify(easyTimer))
                let copyOfEasierTimerMinutes = JSON.parse(JSON.stringify(userEntryEasierTimerMinutes))
                let copyOfEasierTimerSeconds = JSON.parse(JSON.stringify(userEntryEasierTimerSeconds))

                copyOfEditedQuestion.questionType= copyOfQuestionType
                copyOfEditedQuestion.questionEasierBody= copyOfEasierQuestion                
                copyOfEditedQuestion.questionEasierAnswers = copyOfEasierAnswersArray
                copyOfEditedQuestion.questionEasierTimer.isAssigned = copyOfEasierTimerAssigned
                copyOfEditedQuestion.questionEasierTimer.minutes = copyOfEasierTimerMinutes
                copyOfEditedQuestion.questionEasierTimer.seconds = copyOfEasierTimerSeconds

                //mapping correct answers to each question

                setStatefulEditedQuestion(copyOfEditedQuestion)
                nonStatefulEditedQuestion = JSON.parse(JSON.stringify(copyOfEditedQuestion))


                // change 'active' array of question answers being edited by the user
                setStatefulArrayOfQuestionAnswers(statefulEditedQuestion.questionHarderAnswers)
                setMainButtonText('Finish')
            }
            
            
        /* } */
        else if(step==2){

            // harder  question has body  so we need to perform  validation
            if(userEntryHarderQuestionBody && !isQuestionValid()){
                return false;
            }

            if(statefulArrayOfQuestionAnswers.length != 0 && harderQuizBodyNotEntered){
                setEntriesAreValid(false);
                setSnackBar({isOpen:true, message:"Question body cannot be blank", severity:"error"}) 
                return false
            }else if(statefulArrayOfQuestionAnswers.length == 0){
                setEntriesAreValid(true);
            }
            if(hardTimer && (userEntryHarderTimerMinutes == "" || userEntryHarderTimerMinutes == null)){
                setTimerMinutesEntries(false);
                setSnackBar({isOpen:true, message:"Timer value cannot be blank", severity:"error"}) 
                return false;
            }else if(hardTimer && (userEntryHarderTimerSeconds == "" || userEntryHarderTimerSeconds == null)){
                setTimerSecondsEntries(false);
                setSnackBar({isOpen:true, message:"Timer value cannot be blank", severity:"error"}) 
                return false;
            }
            //save last changes
            let copyOfHarderQuestion = JSON.parse(JSON.stringify(userEntryHarderQuestionBody))
            let copyOfQuestionType = JSON.parse(JSON.stringify(statefulEditedQuestion.questionType))
            let copyOfHarderAnswersArray = JSON.parse(JSON.stringify(statefulArrayOfQuestionAnswers))
            let copyOfEditedQuestion = JSON.parse(JSON.stringify(statefulEditedQuestion))
            let copyOfHarderTimerAssigned = JSON.parse(JSON.stringify(hardTimer))
            let copyOfHarderTimerMinutes = JSON.parse(JSON.stringify(userEntryHarderTimerMinutes))
            let copyOfHarderTimerSeconds = JSON.parse(JSON.stringify(userEntryHarderTimerSeconds))

            copyOfEditedQuestion.questionType= copyOfQuestionType
            copyOfEditedQuestion.questionHarderBody= copyOfHarderQuestion
            copyOfEditedQuestion.questionHarderAnswers = copyOfHarderAnswersArray
            copyOfEditedQuestion.questionHarderTimer.isAssigned = copyOfHarderTimerAssigned
            copyOfEditedQuestion.questionHarderTimer.minutes =  copyOfHarderTimerMinutes
            copyOfEditedQuestion.questionHarderTimer.seconds =  copyOfHarderTimerSeconds

            setStatefulEditedQuestion(copyOfEditedQuestion)
            nonStatefulEditedQuestion = JSON.parse(JSON.stringify(copyOfEditedQuestion))

            let copyOfQuestionsArray = JSON.parse(JSON.stringify(props.listOfQuestions))
            copyOfEditedQuestion =  JSON.parse(JSON.stringify(nonStatefulEditedQuestion))                                        

            copyOfQuestionsArray[props.QuestionIndexInQuestionsArray]=copyOfEditedQuestion                    

            props.setListOfQuestions(copyOfQuestionsArray)

            //create a copy from localstorage
            let copyOfQuizngagedUserData = JSON.parse(localStorage.quizngagedUserData)

            //save the edited questions in the copy
            copyOfQuizngagedUserData.questions = copyOfQuestionsArray
        
            //replace the old data with the new data in localstorage
            localStorage.setItem('quizngagedUserData',JSON.stringify(copyOfQuizngagedUserData))

            // call the backend to sync the local changes
            backendQuerySaveUserJSON(()=>{})

            console.log("\n")
            console.log("in edit last step: ",copyOfQuestionsArray)
           
            setEditQuestionState(false)
            setStep(0)
        }            
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
                                ('Enter the question') :
                            (
                                (step==1)?
                                    'Optional: Enter an easier version of the question' :
                                (step==2)? 'Optional: Enter a harder version of the question' :
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
                                label={"Question UID: "+editedQuestionUID.toString()}
                            />                
                        </Box>        
                        <Box marginBottom="1em">
                            <TextField     
                                required={step==0?true:((step==1 && statefulArrayOfQuestionAnswers.length!=0)?true:(step==2 && statefulArrayOfQuestionAnswers.length!=0)?true:false)}
                                fullWidth                   
                                label="Enter the question body"
                                placeholder={step==0?"Question with baseline difficulty":step==1?"Question with easy difficulty":"Question with hard difficulty"}
                                onChange={(event)=>{handleQuestionBodyChange(event,(step==0?(0):(step==1?(1):(2))))}}
                                value={step==0?(userEntryBaselineQuestionBody):((step==1)?(userEntryEasierQuestionBody):(userEntryHarderQuestionBody))}
                                multiline
                                error={!entriesAreValid}
                                helperText={entriesAreValid?'':"Question body cannot be blank"}
                            />
                        </Box>
                        <Box marginBottom="1em">
                            <Autocomplete
                                disabled={step>0?true:false}
                                value={userEntryQuestionType}
                                onChange={(event, newValue) => {
                                (newValue===null)?(setQuestionTypeEntriesAreValid(false)):
                                setUserEntryQuestionType(newValue)
                                setQuestionTypeEntriesAreValid(true);
                                }}
                                disableClearable
                                inputValue={userEntryQuestionType}
                                onInputChange={(event, newInputValue) => {
                                setUserEntryQuestionType(newInputValue)
                                }}
                                disablePortal
                                options={questionTypes}
                                fullWidth
                                renderInput={(questionOption) => <TextField {...questionOption} 
                                label="Question Type" 
                                required
                                error={!questionTypeEntriesAreValid}
                                helperText={questionTypeEntriesAreValid?'':"Question type is invalid"}
                            />}
                            />
                        </Box>
                        <Box marginBottom="1em">
                            <Grid Container columns={12} alignItems='center' justifyContent='flex-start' display={'inline-flex'} style={{left:'0', width:'100%'}} marginBottom="1em" >            
                                <Grid item textAlign={'center'} paddingRight={'1em'} paddingLeft={'1em'}>
                                    <FormGroup>
                                        <FormControlLabel label="Assign Timer"
                                         control={
                                            <Checkbox 
                                            checked={step==0?baselineTimer:step==1?easyTimer:step==2?hardTimer:false} 
                                            onClick={activateTimer}
                                            disabled={(step==0 && userEntryBaselineQuestionBody=="")?true:(step==1&&userEntryEasierQuestionBody=="")?true:(step==2 && userEntryHarderQuestionBody=="")?true:false}
                                            />
                                            }
                                          />
                                    </FormGroup>
                                </Grid>
                                    <Grid item textAlign={'center'} paddingRight={'1em'} paddingLeft={'1em'}>
                                        {((step==0 && baselineTimer) || (step==1 && easyTimer) || (step==2 && hardTimer))&&
                                            <div>
                                                <TextField
                                                 onChange={(e) => setCode(e.target.value), (event)=>{handleTimerMinutesChange(event,(step==0?(0):(step==1?(1):(2))))}} 
                                                 sx={{ width: '10ch' }} 
                                                 label="Minutes" 
                                                 type="number"
                                                 inputProps={{ min: "0", max: "100", step: "1" }}
                                                 value={step==0?(userEntryBaselineTimerMinutes):((step==1)?(userEntryEasierTimerMinutes):(userEntryHarderTimerMinutes))}
                                                 disabled={(step==0 && userEntryBaselineQuestionBody=="")?true:(step==1&&userEntryEasierQuestionBody=="")?true:(step==2 && userEntryHarderQuestionBody=="")?true:false}
                                                 error={!timerMinutesEntries}
                                                 helperText={timerMinutesEntries?'':"Enter minutes"}
                                                 />

                                                <TextField
                                                 onChange={(e) => setCode(e.target.value),(event)=>{handleTimerSecondsChange(event,(step==0?(0):(step==1?(1):(2))))}} 
                                                 sx={{ width: '11ch' }}
                                                 label="Seconds" 
                                                 type="number"
                                                 inputProps={{ min: "0", max: "59", step: "1" }}
                                                 value={step==0?(userEntryBaselineTimerSeconds):((step==1)?(userEntryEasierTimerSeconds):(userEntryHarderTimerSeconds))}
                                                 disabled={(step==0 && userEntryBaselineQuestionBody=="")?true:(step==1&&userEntryEasierQuestionBody=="")?true:(step==2 && userEntryHarderQuestionBody=="")?true:false}
                                                 error={!timerSecondsEntries}
                                                 helperText={timerSecondsEntries?'':"Enter seconds"} 
                                                 />
                                            </div>
                                            }
                                    </Grid>
                                </Grid>
                        </Box>
                        { (userEntryQuestionType == questionTypes[multipleChoiceQuestionIdx] || userEntryQuestionType == questionTypes[binaryQuestionIdx]) && 
                        <div>
                            <Box marginBottom="0.1em">
                            <QuestionAnswers userEntryQuestionType={userEntryQuestionType} statefulArrayOfQuestionAnswers={statefulArrayOfQuestionAnswers} setStatefulArrayOfQuestionAnswers={setStatefulArrayOfQuestionAnswers}>
                            </QuestionAnswers>    
                            </Box>
                            { (statefulArrayOfQuestionAnswers.length < 2 || userEntryQuestionType == questionTypes[multipleChoiceQuestionIdx]) &&
                             <Box marginBottom="2em" textAlign={'center'}>
                                <Button size='medium' variant='contained' color='secondary' startIcon={<AddIcon/>} onClick={handleEditedQuestionAnswer}>
                                    Add answer
                                </Button>
                            </Box>
                            }
                            
                        </div>
                        }       
                         
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