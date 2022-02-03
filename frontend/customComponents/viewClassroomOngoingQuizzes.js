import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import CustomPaperReactComponent from './customPaperReactComponent.js';

export default function ViewClassroomOngoingQuizzes(props){

    React.useEffect(()=>{
        //console.log("ongoing quizzes after load: ",JSON.parse(localStorage.quizngagedUserData).classrooms)
    },[])

    const handleViewLiveOngoingQuiz = ()=>{}
    return(
        <div>
            <Container>
                {(JSON.parse(localStorage.quizngagedUserData).classrooms==undefined)?
                (
                    <div></div>
                )
                :
                (JSON.parse(localStorage.quizngagedUserData).classrooms[props.viewClassroomUID].ongoingLiveQuizzes.length==0)?
                (
                    <Typography variant='h4'>
                        No active quizzes at this time
                    </Typography>
                )
                :
                (
                    <Box paddingTop="1em" paddingBottom="100px">
                    <Grid container spacing={2}>                        
                    {
                        JSON.parse(localStorage.quizngagedUserData).classrooms[props.viewClassroomUID].ongoingLiveQuizzes.map((ongoingLiveQuiz)=>
                        <Grid item xs={12} md={6} lg={4} key={JSON.parse(localStorage.quizngagedUserData).classrooms[props.viewClassroomUID].ongoingLiveQuizzes.indexOf(ongoingLiveQuiz)}>
                            <CustomPaperReactComponent elevation={3}>                            
                            <Typography variant='h5' inline>
                                #{ongoingLiveQuiz.id+" "+"Event description: "+ongoingLiveQuiz.eventDescription}
                            </Typography>                      
                            <Typography variant='subtitle1'>
                                {"Quiz ID in use: "+ongoingLiveQuiz.quizSelected}
                            </Typography>                            
                            {/* <Typography variant='subtitle1'>
                                {"Quiz Title in use: "+ongoingLiveQuiz.quizTitle}
                            </Typography>*/}                            
                            <Button size="small" onClick={(event) => handleViewLiveOngoingQuiz(event, ongoingLiveQuiz.id)}>VIEW</Button>
                            {/* <Button size="small" onClick={(event) => handleEditClassroom(event, classroom.id)}>EDIT</Button> */}
                            </CustomPaperReactComponent>
                        </Grid>      
                        )
                    }
                    </Grid>              
                    </Box>
                )}
            </Container>
        </div>
    )
}