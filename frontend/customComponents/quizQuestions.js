import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import { Grid, Typography } from '@mui/material';


/* import { styled } from '@mui/styles';

const DisabledText = styled(Typography)({
    root: {
      color: "#grey"
    }
  }); */

export default function QuizQuestions(props){          

    const handleQuestionSelectionChange = (event,index) => {        

        let copy = props.statefulArrayOfQuestionSelected
        console.log("event.target.checked",event.target.checked,)
        copy[index] = event.target.checked
        props.setStatefulArrayOfQuestionSelected(copy)
    };            

    React.useEffect(()=>{

        let nonStatefulArrayOfQuestionsSelected = []
        for(let i=0; i< JSON.parse(localStorage.quizngagedUserData).questions; i++){
            nonStatefulArrayOfQuestionsSelected.push(false)
        }
        props.setStatefulArrayOfQuestionSelected(nonStatefulArrayOfQuestionsSelected)

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
            <Grid Container style={{background:'#eeeeee'}} marginBottom={'1em'} padding={'0.1em'}>                
                <div>                    
                {JSON.parse(localStorage.quizngagedUserData).questions.map((question)=>
                                                
                        <Grid item key={question.id} margin={'0.5em'} justifyContent={'center'} > 
                            <Paper justifyContent={'center'}>
                                <Checkbox
                                    disabled={props.step>0?true:false}
                                    checked={props.statefulArrayOfQuestionSelected[question.id]}
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