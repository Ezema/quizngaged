
import * as React from 'react';


/* mui libraries */
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import * as formValidator from '../customFunctions/formValidation.js';

export default function RenderTextQuestion({
    questionBody,
    setCurrentAnswer
  }
  ){
    const [entriesAreValid,setEntriesAreValid] = React.useState('true')

    const updateTextAnswer = (ev) =>{
      ev.preventDefault
      let changedBody = ev.target.value;
      let quizBodyNotEntered = !formValidator.isValidMandatoryText(changedBody);
        
      if(quizBodyNotEntered){
          setEntriesAreValid(false)
          setCurrentAnswer(null)
        }else{
          setEntriesAreValid(true)
          setCurrentAnswer(changedBody)
        }
      
    }

   return <>
   <h3>{questionBody}</h3>
    <Box className="task-conatiner">
         <TextField 
            id="outlined-basic" 
            label="Your answer" 
            variant="outlined" 
            onChange={updateTextAnswer} 
            error={!entriesAreValid}
            helperText={entriesAreValid?'':"Answer body cannot be empty"}/> 
     </Box> 
   </>
    
}