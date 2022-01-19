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

import Autocomplete from '@mui/material/Autocomplete';

import { width } from '@mui/system';

const steps = [
  'Add base question',
  'Add easier version',
  'Add harder version',
];
export default function AddQuestion(props){

    const setAddQuestion = props.setAddQuestion;

    const [step,setStep] = React.useState(0)
    const [entriesAreValid,setEntriesAreValid] = React.useState('true')
    const [mainButtonText,setMainButtonText] = React.useState('NEXT')

    const [userEntryQuestionType,setUserEntryQuestionType] = React.useState('Multiple Choice')

    const handleNextStep = ()=>{
        (step<2 && entriesAreValid)?
            (step==1)?(setStep(step+1),setMainButtonText('Finish')):(setStep(step+1))
        :
        (step==2)?
            (setAddQuestion(false))
        :
            (null)
            
    }

    const questionType = [
        'Multiple Choice','Text response'
    ]
    
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
                            <Typography variant='subtitle1' padding={0.5}>
                                Question UID
                            </Typography>
                            <TextField     
                                margin={'0.5em'}
                                disabled
                                fullWidth 
                                //this will be fetched from the API...            
                                label="613"
                            />                
                        </Box>        
                        <Box marginBottom="1em">
                            <TextField     
                                required
                                fullWidth                   
                                label="Enter the question body"
                                /* placeholder="Question with baseline difficulty" */
                                multiline
                            />
                        </Box>
                        <Box marginBottom="1em">
                            <Autocomplete
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
                    </Box>
                </Box>
            </Container>
            <Container>
                    <Button size='large' variant='contained' color='success' fullWidth /* style={{position:'fixed', bottom:'1em', left:'1em',right:'1em'}} */ onClick={()=>handleNextStep()}  >
                        {mainButtonText}
                    </Button>
            </Container>
        </div>
    )
}