import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { Button } from '@mui/material';

export default function QuestionAnswers(props){
    
    const handleQuestionChange = (event,index) => {        
        //statefulArrayOfQuestionAnswers[index].body = event.target.value;
        
        //React's useState hook doesn't 'notice' the changes of the values inside the object/array so a deep copy of the array has to be generated
        let copyOfArray = JSON.parse(JSON.stringify(props.statefulArrayOfQuestionAnswers))
        copyOfArray[index].body = event.target.value;
        
        props.setStatefulArrayOfQuestionAnswers(copyOfArray);
    };

    const handleQuestionAnswerDeletion = (event,index) => {
        let copyOfArray = JSON.parse(JSON.stringify(props.statefulArrayOfQuestionAnswers))
        copyOfArray.splice(index,1);
        for(let i=index;i<copyOfArray.length;i++){
            copyOfArray[i].id = copyOfArray[i].id - 1;
        }
        props.setStatefulArrayOfQuestionAnswers(copyOfArray);
    }

    return(
        <div>
        {props.statefulArrayOfQuestionAnswers.map((questionAnswer)=>    
            
            <Grid Container columns={12} alignItems='center' justifyContent='center' display={'inline-flex'} style={{right:'0', width:'100%'}} marginBottom="1em" key={questionAnswer.id}>                    
            
                <Grid item textAlign={'center'} paddingRight={'1em'} paddingLeft={'1em'}>
                    <Typography inline noWrap>                            
                        {questionAnswer.id.toString()}.
                    </Typography>    
                </Grid>
                <Grid item style={{right:'0', width:'100%'}}>
                    <TextField     
                        style={{right:'0', width:'100%'}}           
                        onChange={(event)=>handleQuestionChange(event,props.statefulArrayOfQuestionAnswers.indexOf(questionAnswer))}                            
                        value={questionAnswer.body}
                        label="Enter an answer"                            
                    />
                </Grid>
                <Grid item style={{right:'',maxWidth:'0.5em' }} padding={0} margin={0}>
                    <IconButton aria-label="delete" size="small" color='warning' onClick={(event)=>handleQuestionAnswerDeletion(event,props.statefulArrayOfQuestionAnswers.indexOf(questionAnswer))}>
                        <HighlightOffIcon fontSize="inherit" />
                    </IconButton>
                </Grid>
            </Grid>
        )
        }
        </div>
    )
}