import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';

export default function QuizQuestions(props){
    const [checked, setChecked] = React.useState(true);

    const handleQuestionSelectionChange = (event,index) => {
        setChecked(event.target.checked);
    };

    const [statefulQuestions, setStatefulQuestions] = React.useState(null)

    const [statefulArrayOfQuestionSelected, setStatefulArrayOfQuestionSelected] = React.useState([])    

    React.useEffect(()=>{

        let nonStatefulArrayOfQuestionsSelected = []
        for(let i=0; i< JSON.parse(localStorage.quizngagedUserData).questions; i++){
            nonStatefulArrayOfQuestionsSelected.push(false)
        }
        setStatefulArrayOfQuestionSelected(nonStatefulArrayOfQuestionsSelected)

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
            <Grid Container style={{background:'lightgrey'}} marginBottom={'1em'}>                
                <div>                    
                {JSON.parse(localStorage.quizngagedUserData).questions.map((question)=>
                                                
                        <Grid item key={question.id}> 
                            <Checkbox
                                checked={statefulArrayOfQuestionSelected[JSON.parse(localStorage.quizngagedUserData).questions.indexOf(question)]}
                                onChange={(event)=>handleQuestionSelectionChange(event,JSON.parse(localStorage.quizngagedUserData).questions.indexOf(question))}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            {question.questionBaselineBody}                            
                        </Grid>                        
                )}
                </div>                           
            </Grid>                               
            )}
        </div>
    )
}