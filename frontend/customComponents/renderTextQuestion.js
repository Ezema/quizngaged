
import * as React from 'react';


/* mui libraries */
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function RenderTextQuestion({
    questionBody,
    setCurrentAnswer
  }
  ){
 
const updateTextAnswer = (ev) =>{
   ev.preventDefault
   setCurrentAnswer(ev.target.value)
}

   return <>
   <h3>{questionBody}</h3>
    <Box className="task-conatiner">
         <TextField id="outlined-basic" label="Your answer" variant="outlined" onChange={updateTextAnswer} /> 
     </Box>    
   </>
    
}