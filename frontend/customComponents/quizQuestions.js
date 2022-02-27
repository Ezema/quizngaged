import * as React from 'react';

/* mui libraries */
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import { Grid, Typography } from '@mui/material';

export default function QuizQuestions(props){          

    const handleQuestionSelectionChange = (event,questionId) => {

        if(props.statefulArrayOfQuestionSelected.indexOf(questionId)!=(-1)){
            console.log("remove")
            let copy = JSON.parse(JSON.stringify(props.statefulArrayOfQuestionSelected))
            copy.splice(copy.indexOf(questionId), 1)
            props.setStatefulArrayOfQuestionSelected(copy)
        }else{            
            console.log("add")
            let copy = JSON.parse(JSON.stringify(props.statefulArrayOfQuestionSelected))
            copy.push(questionId)
            props.setStatefulArrayOfQuestionSelected(copy)
        }
    };            


    /* console.log("inside quiz questions props:", props)
    console.log("inside quiz questions:", props.editQuizQuestions) */

    React.useEffect(()=>{

        if(props.editQuizState){
            
        }else{
            let nonStatefulArrayOfQuestionsSelected = []
            for(let i=0; i< JSON.parse(localStorage.quizngagedUserData).questions; i++){
                nonStatefulArrayOfQuestionsSelected.push(false)
            }
            props.setStatefulArrayOfQuestionSelected(nonStatefulArrayOfQuestionsSelected)
        }
        

    },[])

    return(
        <div>            
            {(JSON.parse(localStorage.quizngagedUserData).questions=null)?
            (
                <div>

                </div>
            )
            :
            (           
            <Grid Container style={{background:'#eeeeee'}} marginBottom={'1em'} padding={'0.1em'} maxHeight={'36vh'} overflow={'scroll'}>                
                <div>                    
                {JSON.parse(localStorage.quizngagedUserData).questions.map((question)=>
                                                
                        <Grid item key={question.id} margin={'0.5em'} justifyContent={'center'} > 
                            <Paper justifyContent={'center'}>                                
                                <Checkbox
                                    disabled={props.step>0?true:false}
                                    checked={props.statefulArrayOfQuestionSelected.includes(question.id)}
                                    onChange={(event)=>handleQuestionSelectionChange(event,question.id)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />    
                                {/* {(props.step>0)?
                                (
                                <DisabledText>
                                    {question.id+". "+question.questionBaselineBody}
                                </DisabledText>
                                )
                                :
                                ( */}
                                <Typography display="inline">
                                    {question.id+". "+question.questionBaselineBody}
                                </Typography>                            
                                {/* )} */}
                                                                
                                                            
                            </Paper>
                        </Grid>                        
                )}
                </div>                           
            </Grid>                               
            )}
        </div>
    )
}