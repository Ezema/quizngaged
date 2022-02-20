
import * as React from 'react';


/* mui libraries */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

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
     updateAnswers( question.id, question.questionType, currentAnswer )
     
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
    
  
  switch(question.questionType){
    case 'Multiple Choice':
    case 'Binary Question':  
      return <>
       <RenderMultichoice 
              questionBody={questionBody}
              timer={timer}
              timerMin={timerMin}
              timerSec={timerSec}
              questionVariants={questionVariants}
              updateVariants = {updateVariants}
              setCurrentAnswer = {setCurrentAnswer}
              questionType={question.questionType} />
        <Box>
           <Button variant="contained" onClick={submitAnswer}>Submit Answer</Button>
        </Box>
       </> 
    case 'Text Response':  
      return <>
       <RenderTextQuestion 
              questionBody={ questionBody }
              timer={timer}
              timerMin={timerMin}
              timerSec={timerSec}
              setCurrentAnswer ={ setCurrentAnswer } 
              />
        <Box>
           <Button variant="contained" onClick={submitAnswer}>Submit Answer</Button>
        </Box>
       </>
  }    
    
}