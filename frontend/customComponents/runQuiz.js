
import * as React from 'react';


/* mui libraries */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


/* Custom components */
import  RenderQuestion   from '../customComponents/renderQuestion.js'

export default function runQuiz({
    state,
    setState,
    quiz,
    setQuiz,
    updateAnswers,
    sendQuizToServer,
    timer,
    timerMin,
    timerSec
      
  }
  ){

 const styleActive = {
	backgroundColor: '#0a3462'
	} 

  const stylePassive = {

	} 
  
  
   


  const startQuiz =  () =>{
    var updatedState = { ...state, 
                  currentScreen: 2}
    setState(updatedState)
  }

  const updateQuestions = (question)=>{
    var newQuestions = quiz.questions.map(item => {
      if(item.id  == question.id){
        item = question
      }
      return item
    }) 
    setQuiz({...quiz, questions:newQuestions}) 
  }

   const getCurrentQuestion = () => {
    return quiz.questions.find( (item, key) => state.currentQuestionInd == key)
  }

  const goToNextQuestion = (curQuestion) =>{
    let curIndex =   quiz.questions.findIndex(item => item.id == curQuestion.id)
       
    if(curIndex < quiz.questions.length-1 ){
        let nextIndex = curIndex+1
        setState({...state, currentQuestionInd:nextIndex})
    } else {
      // it is trhe last question  in the quiz show Summary page
        setState({...state,currentScreen:3})

    }
  }

  const setDifficulty = (difficultyLevel) =>{
   
     var updatedState = { ...state, 
                  currentDifficulty: difficultyLevel}
    setState(updatedState)
  }
 

  const submitQuiz = (e=null) =>{
     e && e.preventDefault()
     
     sendQuizToServer()
     setState({...state,currentScreen:4})
  }

    if (state.currentScreen === 1) 
    {
    // render start quiz
      return <>
      <h2>{quiz.quizTitle}</h2>
      <h3>Topic: {quiz.quizTopic}</h3>
      <Box>
         <Button variant="contained" onClick={startQuiz}>Start Quiz</Button>
      </Box>
      
      </>

    } 
    else if (state.currentScreen === 2) 
    {
      var question = getCurrentQuestion()
      console.log('question', question)
      if(question){
      

      return <>
               
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button style={(state.currentDifficulty=='easy')?{...styleActive}:{...stylePassive}} onClick={()=>setDifficulty('easy')}>Easy</Button>
                <Button style={(state.currentDifficulty=='base')?{...styleActive}:{...stylePassive}}  onClick={()=>setDifficulty('base')}>Base</Button>
                <Button style={(state.currentDifficulty=='hard')?{...styleActive}:{...stylePassive}}  onClick={()=>setDifficulty('hard')}>Hard</Button>
              </ButtonGroup>
              <RenderQuestion question={question}
                              state={state}
                              setState={setState}
                              updateQuestions ={updateQuestions}
                              goToNextQuestion ={goToNextQuestion}
                              updateAnswers = {updateAnswers}
                              timer={timer}
                              timerMin={timerMin}
                              timerSec={timerSec} />
            </>
      } else {
        return <>
         No question loaded
        
         </>
      }
    }
    else if (state.currentScreen === 3) 
    {
      return <>
               <p>You've answered all the question and you can submit the quiz</p>
               <Box>
                 <Button variant="contained" onClick={submitQuiz}>SubmitQuiz</Button>
              </Box>
             </> 
    } 
    else if (state.currentScreen === 4) 
    {
      return <>
             <p>Congratulations. The quiz is submitted</p>
      </> 
    }
}