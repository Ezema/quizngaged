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

import { width } from '@mui/system';

const steps = [
  'Add base question',
  'Add easier version',
  'Add harder version',
];

export default function AddQuestion(props){

    const listOfQuestions = props.listOfQuestions;
    const setListOfQuestions = props.setListOfQuestions;
    const newQuestionUID = props.newQuestionUID;

    const newQuestion = {id:newQuestionUID,questionType:'Multiple Choice',baselineQuestion:"",baselineQuestionAnswers:[{id:1,parentQuestionId:newQuestionUID,body:''}],easierQuestion:"",easierQuestionAnswers:[{id:1,parentQuestionId:newQuestionUID,body:''}],harderQuestion:"",harderQuestionAnswers:[{id:1,parentQuestionId:newQuestionUID,body:''}]}

    const [statefulNewQuestion,setStatefulNewQuestion] = React.useState(newQuestion)
    const nonStatefulNewQuestion = newQuestion

    const [statefulArrayOfQuestionAnswers,setStatefulArrayOfQuestionAnswers] = React.useState(statefulNewQuestion.baselineQuestionAnswers)
    

    const setAddQuestionState = props.setAddQuestionState;

    const [step,setStep] = React.useState(0)
    const [entriesAreValid,setEntriesAreValid] = React.useState('true')
    const [mainButtonText,setMainButtonText] = React.useState('Next')

    const [userEntryQuestionType,setUserEntryQuestionType] = React.useState(statefulNewQuestion.questionType)
    const [userEntryBaselineQuestionBody,setUserEntryBaselineQuestionBody] = React.useState(statefulNewQuestion.baselineQuestion)
    const [userEntryEasierQuestionBody,setUserEntryEasierQuestionBody] = React.useState(statefulNewQuestion.easierQuestion)
    const [userEntryHarderQuestionBody,setUserEntryHarderQuestionBody] = React.useState(statefulNewQuestion.harderQuestion)

    const handleQuestionBodyChange = (event, questionDifficulty)=>{
        if(questionDifficulty==0){            
            setUserEntryBaselineQuestionBody(event.target.value)            
        }else if(questionDifficulty==1){
            setUserEntryEasierQuestionBody(event.target.value)
        }else if(questionDifficulty==2){
            setUserEntryHarderQuestionBody(event.target.value)
        }
    }


    const calculateLastQuestionAnswerUID = (array)=>{        
        return array[array.length-1].id;
    }
    const getParentQuestionUID = (array)=>{
        return array[array.length-1].parentQuestionId;
    }
    

    const handleNewQuestionAnswer = () => {
        
        const createNewIndex = calculateLastQuestionAnswerUID(statefulArrayOfQuestionAnswers) + 1;
        const parentQuestionUID = getParentQuestionUID(statefulArrayOfQuestionAnswers);

        let copyArray = JSON.parse(JSON.stringify(statefulArrayOfQuestionAnswers))

        copyArray.push({id:createNewIndex,parentQuestionId:parentQuestionUID,body:''})
        

        setStatefulArrayOfQuestionAnswers(copyArray)
    }

    const handlePreviousStep = ()=>{
        if(step==0){
            (setAddQuestionState(false),setStep(0))
        }else if(step==1){                
            setStep(step-1)

            let copyOfEasierQuestion = JSON.parse(JSON.stringify(userEntryEasierQuestionBody))
            let copyOfQuestionType = JSON.parse(JSON.stringify(statefulNewQuestion.questionType))
            let copyOfEasierAnswersArray = JSON.parse(JSON.stringify(statefulArrayOfQuestionAnswers))     
            let copyOfNewQuestion = JSON.parse(JSON.stringify(statefulNewQuestion))
            
            copyOfNewQuestion.questionType= copyOfQuestionType
            copyOfNewQuestion.easierQuestion= copyOfEasierQuestion                
            copyOfNewQuestion.easierQuestionAnswers = copyOfEasierAnswersArray

            //mapping correct answers to each question

            setStatefulNewQuestion(JSON.parse(JSON.stringify(copyOfNewQuestion)))
            nonStatefulNewQuestion = JSON.parse(JSON.stringify(copyOfNewQuestion))
                        
            // change 'active' array of question answers being edited by the user

            setStatefulArrayOfQuestionAnswers(JSON.parse(JSON.stringify(statefulNewQuestion.baselineQuestionAnswers)))            
            setMainButtonText('Next')

        }else if(step==2){
            setStep(step-1)

            let copyOfHarderQuestion = JSON.parse(JSON.stringify(userEntryHarderQuestionBody))
            let copyOfQuestionType = JSON.parse(JSON.stringify(statefulNewQuestion.questionType))
            let copyOfHarderAnswersArray = JSON.parse(JSON.stringify(statefulArrayOfQuestionAnswers))
            let copyOfNewQuestion = JSON.parse(JSON.stringify(statefulNewQuestion))
                
            copyOfNewQuestion.questionType= copyOfQuestionType
            copyOfNewQuestion.harderQuestion= copyOfHarderQuestion
            copyOfNewQuestion.harderQuestionAnswers = copyOfHarderAnswersArray
    
            setStatefulNewQuestion(JSON.parse(JSON.stringify(copyOfNewQuestion)))
            nonStatefulNewQuestion = JSON.parse(JSON.stringify(copyOfNewQuestion))
            
            setStatefulArrayOfQuestionAnswers(statefulNewQuestion.easierQuestionAnswers)
            setMainButtonText('Next')
        }
    }

    const handleNextStep = ()=>{
        /* if(step<2 && entriesAreValid){ */
            if(step==0){
                (setStep(step+1));
                // save user changes temporary
                                
                let copyOfBaselineQuestion = JSON.parse(JSON.stringify(userEntryBaselineQuestionBody))
                let copyOfQuestionType = JSON.parse(JSON.stringify(statefulNewQuestion.questionType))
                let copyOfBaselineAnswersArray = JSON.parse(JSON.stringify(statefulArrayOfQuestionAnswers))                    
                let copyOfNewQuestion = JSON.parse(JSON.stringify(statefulNewQuestion))
                
                copyOfNewQuestion.questionType= copyOfQuestionType
                copyOfNewQuestion.baselineQuestion= copyOfBaselineQuestion
                copyOfNewQuestion.baselineQuestionAnswers = copyOfBaselineAnswersArray

                setStatefulNewQuestion(copyOfNewQuestion)
                nonStatefulNewQuestion = JSON.parse(JSON.stringify(copyOfNewQuestion))

                // change 'active' array of question answers being edited by the user
                setStatefulArrayOfQuestionAnswers(statefulNewQuestion.easierQuestionAnswers)
            }
            else if(step==1){
                setStep(step+1)                
                // save user changes temporary
                
                let copyOfEasierQuestion = JSON.parse(JSON.stringify(userEntryEasierQuestionBody))
                let copyOfQuestionType = JSON.parse(JSON.stringify(statefulNewQuestion.questionType))
                let copyOfEasierAnswersArray = JSON.parse(JSON.stringify(statefulArrayOfQuestionAnswers))     
                let copyOfNewQuestion = JSON.parse(JSON.stringify(statefulNewQuestion))
                
                copyOfNewQuestion.questionType= copyOfQuestionType
                copyOfNewQuestion.easierQuestion= copyOfEasierQuestion                
                copyOfNewQuestion.easierQuestionAnswers = copyOfEasierAnswersArray

                //mapping correct answers to each question

                setStatefulNewQuestion(copyOfNewQuestion)
                nonStatefulNewQuestion = JSON.parse(JSON.stringify(copyOfNewQuestion))


                // change 'active' array of question answers being edited by the user
                setStatefulArrayOfQuestionAnswers(statefulNewQuestion.harderQuestionAnswers)
                setMainButtonText('Finish')
            }
            else if(step==2){
                //save last changes
                let copyOfHarderQuestion = JSON.parse(JSON.stringify(userEntryHarderQuestionBody))
                let copyOfQuestionType = JSON.parse(JSON.stringify(statefulNewQuestion.questionType))
                let copyOfHarderAnswersArray = JSON.parse(JSON.stringify(statefulArrayOfQuestionAnswers))
                let copyOfNewQuestion = JSON.parse(JSON.stringify(statefulNewQuestion))
                
                copyOfNewQuestion.questionType= copyOfQuestionType
                copyOfNewQuestion.harderQuestion= copyOfHarderQuestion
                copyOfNewQuestion.harderQuestionAnswers = copyOfHarderAnswersArray
    
                setStatefulNewQuestion(copyOfNewQuestion)
                nonStatefulNewQuestion = JSON.parse(JSON.stringify(copyOfNewQuestion))
    
                let copyOfQuestionsArray = JSON.parse(JSON.stringify(listOfQuestions))
                copyOfNewQuestion =  JSON.parse(JSON.stringify(nonStatefulNewQuestion))                
                copyOfQuestionsArray.push(copyOfNewQuestion)
                setListOfQuestions(copyOfQuestionsArray)
                setAddQuestionState(false)
                setStep(0)
            }            
            
            
        /* } */
        
    }

    const questionType = ['Multiple Choice','Text Response']    
    
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
                                label={"Question UID: "+newQuestionUID.toString()}
                            />                
                        </Box>        
                        <Box marginBottom="1em">
                            <TextField     
                                required={step>0?false:true}
                                fullWidth                   
                                label="Enter the question body"
                                placeholder={step==0?"Question with baseline difficulty":step==1?"Question with easy difficulty":"Question with hard difficulty"}
                                onChange={(event)=>{handleQuestionBodyChange(event,(step==0?(0):(step==1?(1):(2))))}}
                                value={step==0?(userEntryBaselineQuestionBody):((step==1)?(userEntryEasierQuestionBody):(userEntryHarderQuestionBody))}
                                multiline
                            />
                        </Box>
                        <Box marginBottom="1em">
                            <Autocomplete
                                disabled={step>0?true:false}
                                value={userEntryQuestionType}
                                onChange={(event, newValue) => {
                                setUserEntryQuestionType(newValue);
                                }}
                                inputValue={userEntryQuestionType}
                                onInputChange={(event, newInputValue) => {
                                setUserEntryQuestionType(newInputValue);
                                }}
                                disablePortal
                                options={questionType}
                                fullWidth
                                renderInput={(questionOption) => <TextField {...questionOption} 
                                label="Question Type" 
                            />}
                            />
                        </Box>        
                        <Box marginBottom="0.1em">
                            <QuestionAnswers statefulArrayOfQuestionAnswers={statefulArrayOfQuestionAnswers} setStatefulArrayOfQuestionAnswers={setStatefulArrayOfQuestionAnswers}>
                            </QuestionAnswers>    
                        </Box>                  
                        <Box marginBottom="2em" textAlign={'center'}>
                            <Button size='medium' variant='contained' color='secondary' startIcon={<AddIcon/>} onClick={handleNewQuestionAnswer}>
                                Add answer
                            </Button>
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
        </div>
    )
}