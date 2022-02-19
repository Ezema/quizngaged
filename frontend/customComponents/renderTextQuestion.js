
import * as React from 'react';


/* mui libraries */
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function RenderTextQuestion({
    questionBody,
    setCurrentAnswer,
    timer,
    timerMin,
    timerSec
  }
  ){
 
const updateTextAnswer = (ev) =>{
   ev.preventDefault
   setCurrentAnswer(ev.target.value)
}

const [seconds, setSeconds] = React.useState(timerSec);
    const [minutes, setMinutes] = React.useState(timerMin);
    React.useEffect(() => {
  
      let myInterval = setInterval(() => {
        if (seconds > 0) {
            setSeconds(seconds - 1);
        }
        if(seconds <= 10){
          setSeconds('0' + (seconds - 1))
        }
        if (seconds === 0 || seconds === '00') {
            if (minutes === 0) {
                setSeconds(0)
                clearInterval(myInterval)
            } else {
                setMinutes(minutes - 1);
                setSeconds(59);
            }
        } 
    }, 1000)
    return ()=> 
        clearInterval(myInterval);
      
    
    });

   return <>
   <h3>{questionBody}</h3>
    <Box className="task-conatiner">
         <TextField id="outlined-basic" label="Your answer" variant="outlined" onChange={updateTextAnswer} /> 
     </Box> 
     <Box>
       {timer?
            <div>
              {(minutes===0 && seconds === "00")?
                <p>Time Expired!</p>
              :
                <p>Time Left: {minutes}:{seconds}</p>
              }
            </div>
          :
          ""}
      </Box>
   </>
    
}