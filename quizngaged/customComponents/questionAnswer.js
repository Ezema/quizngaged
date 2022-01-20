import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function QuestionAnswers(props){        
    const arrayOfQuestionAnswers = props.arrayOfQuestionAnswers;
    
    return(
        <div>
        {arrayOfQuestionAnswers.map((questionAnswer)=>    
            <Grid Container columns={12} alignItems='center' justifyContent='center' display={'inline-flex'} style={{right:'0', width:'100%'}} marginBottom="1em" key={questionAnswer.id}>                    
                    <Grid item textAlign={'center'} paddingRight={'1em'} paddingLeft={'1em'}>
                        <Typography inline noWrap>                            
                            {questionAnswer.id.toString()}.
                        </Typography>    
                    </Grid>
                    <Grid item style={{right:'0', width:'100%'}}>
                        <TextField     
                            style={{right:'0', width:'100%'}}                            
                            label="Enter an answer"
                            placeholder="Enter an answer"                                    
                        />
                    </Grid>
            </Grid>
        )
        }
        </div>
    )
}