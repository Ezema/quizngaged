
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
    updateAnswers
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
      questionVariants = question.questionBaselineAnswers;
      break
    case 'easy': 
      questionBody = question.questionEasierBody;
      questionVariants = question.questionEasierAnswers;
      break
    case 'hard':  
      questionBody = question.questionHarderBody;
      questionVariants = question.questionHarderAnswers;
      break

    }
   
  
  switch(question.questionType){
    case 'Multiple Choice':
    case 'Binary Question':  
      return <>
       <RenderMultichoice 
              questionBody={questionBody} 
              questionVariants={questionVariants}
              updateVariants = {updateVariants}
              setCurrentAnswer = {setCurrentAnswer} />
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
           <Button variant="contained" onClick={submitAnswer}>Submit Answer</Button>
        </Box>
       </>
  }    
    
}