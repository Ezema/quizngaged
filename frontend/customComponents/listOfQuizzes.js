import * as React from 'react';
import { Grid, Typography, Checkbox, Paper } from '@mui/material';

export default function ListOfQuizzes(props){          

    const handleQuizSelectionChange = (event,quizId) => {
        if(props.statefulQuizSelected==quizId){
            props.setStatefulQuizSelected(null)
        }
        else{
            props.setStatefulQuizSelected(quizId)
        }
    };

    console.log("props: ", props)
    return(
        <div>            
            {(JSON.parse(localStorage.quizngagedUserData).quizzes=null)?
            (
                <div>

                </div>
            )
            :
            (           
            <Grid Container style={{background:'#eeeeee'}} marginBottom={'1em'} padding={'0.1em'} maxHeight={'36vh'} overflow={'scroll'}>                
                <div>                    
                {JSON.parse(localStorage.quizngagedUserData).quizzes.map((quiz)=>
                                                
                        <Grid item key={quiz.id} margin={'0.5em'} justifyContent={'center'} > 
                            <Paper justifyContent={'center'}>                                
                                <Checkbox
                                    disabled={props.step>0?true:false}
                                    checked={props.statefulQuizSelected==(quiz.id)}
                                    onChange={(event)=>handleQuizSelectionChange(event,quiz.id)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />    
                                <Typography display="inline">
                                    {quiz.id+". "+quiz.quizTitle}
                                </Typography>                            
                                                                
                                                            
                            </Paper>
                        </Grid>                        
                )}
                </div>                           
            </Grid>                               
            )}
        </div>
    )
}