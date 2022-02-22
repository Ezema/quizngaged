
import * as React from 'react';


/* mui libraries */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

/* Custom components */
import  RenderMultichoice   from '../customComponents/renderMultichoice'
import  RenderTextQuestion   from '../customComponents/renderTextQuestion'

export default function RenderQuestion({
    state,
    setState,
    question,
    updateQuestions,
    goToNextQuestion,
    updateAnswers,
    timer,
    timerMin,
    timerSec
  }
  ){
 
  var questionBody;
  var questionVariants;
  const [currentAnswer, setCurrentAnswer] = React.useState(null)
  const [snackBar, setSnackBar] = React.useState({isOpen:false, message:'Test'})

  const snackBarClose = () => {
    setSnackBar({isOpen:false,message:"", severity:""})
}
  const  updateVariants = (variants) =>{
    switch(state.currentDifficulty) {
    case 'base':  
      question.questionBaselineAnswers = variants 
      break
    case 'easy': 
      question.questionEasierAnswers = variants;
      break
    case 'hard':  
      question.questionHarderAnswers = variants;
      break
     }
     
     updateQuestions(question)
     
  }

  const submitAnswer = ( e = null) => {
     e && e.preventDefault()
     // updateAnswers

     // student cannot leave the text field empty otherwise the answer is not stored corectly
     if(question.questionType == 'Text Response' && (currentAnswer == null || currentAnswer == '')){
        console.log(currentAnswer)
        setSnackBar({isOpen:true, message:"Answer body cannot be empty", severity:"error"})
        return false
     }
     updateAnswers( question.id, question.questionType, currentAnswer )
     setCurrentAnswer(null)
     goToNextQuestion( question )
  }

  switch(state.currentDifficulty) {
    case 'base':  
      questionBody = question.questionBaselineBody;
      var timer = null

      if(question.questionBaselineTimer && question.questionBaselineTimer.isAssigned){
         timer = question.questionBaselineTimer.isAssigned
      } 
      
      if(timer){
        timerMin = question.questionBaselineTimer.minutes
        timerSec =question.questionBaselineTimer.seconds
      }
      questionVariants = question.questionBaselineAnswers;
      break
    case 'easy': 
      questionBody = question.questionEasierBody;
      
      var  timer = null 
      if(question.questionEasierTimer && question.questionEasierTimer.isAssigned){
         timer = question.questionEasierTimer.isAssigned
      }
      if(timer){
        timerMin = question.questionEasierTimer.minutes
        timerSec =question.questionEasierTimer.seconds
      }
      questionVariants = question.questionEasierAnswers;
      break
    case 'hard':  
      questionBody = question.questionHarderBody;
      var  timer = null 
      if(question.questionHarderTimer && question.questionHarderTimer.isAssigned){
         timer = question.questionHarderTimer.isAssigned
      }
      if(timer){
        timerMin = question.questionHarderTimer.minutes
        timerSec =question.questionHarderTimer.seconds
      }
      questionVariants = question.questionHarderAnswers;
      break

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
            if (minutes === 0 || minutes === '0') {
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
    
  
  switch(question.questionType){
    case 'Multiple Choice':
    case 'Binary Question':  
      return <>
       <RenderMultichoice 
              questionBody={questionBody}
              questionVariants={questionVariants}
              updateVariants = {updateVariants}
              setCurrentAnswer = {setCurrentAnswer}
              questionType={question.questionType} />
        <Box>
        {timer?
        
          <div>
            {(minutes === 0 || minutes === '0') && (seconds === 0 || seconds === "00")?
            <p>Time Expired!</p>  
            :
            <p>
              Time Left: {minutes}:{seconds}
            </p>
            }
          </div>
          :
          ""}
        </Box>
        <Box>
           <Button variant="contained" onClick={submitAnswer}>Submit Answer</Button>
        </Box>
       </> 
    case 'Text Response':  
      return <>
       <RenderTextQuestion 
              questionBody={ questionBody }
              setCurrentAnswer ={ setCurrentAnswer } 
              />
        <Box>
        {timer?
        
          <div>
            {(minutes === 0 || minutes === '0') && (seconds === 0 || seconds === "00")?
            <p>Time Expired!</p>
            :
            <p>
              Time Left: {minutes}:{seconds}
            </p>
            }
          </div>
          :
          ""}
        </Box>
        <Box>
           <Button variant="contained" onClick={submitAnswer}>Submit Answer</Button>
        </Box>
        <Snackbar
                open={snackBar.isOpen}
                autoHideDuration={6000}
                onClose={snackBarClose}
                >
                     <Alert severity={snackBar.severity}>{snackBar.message}</Alert>
                </Snackbar>
       </>
  }    
    
}