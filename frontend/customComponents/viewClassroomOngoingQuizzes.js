import * as React from 'react';

/* mui libraries */
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import CustomPaperReactComponent from './customPaperReactComponent.js';
import RefreshIcon from '@mui/icons-material/Refresh';

/* customFunctions */
import findArrayIndex from '../customFunctions/findArrayIndex.js';
import backendQueryUpdateOngoingQuizzes from '../customFunctions/backendQueries/backendQueryUpdateOngoingQuizzes.js'

/* router */
import { useRouter } from 'next/router'


export default function ViewClassroomOngoingQuizzes(props){

    let classroomsJson = JSON.parse(localStorage.quizngagedUserData).classrooms;
    const classroomIndex = findArrayIndex(classroomsJson, 'globalQuizngagedId', props.globalQuizngagedId);
    const [classroom, setClassroom] = React.useState(classroomsJson[classroomIndex]);

    const Router = useRouter()

    React.useEffect(()=>{
        handleRefreshLiveOngoingQuizzes();
    },[refreshingOngoingQuizzes])

    const [refreshingOngoingQuizzes,setRefreshingOngoingQuizzes] = React.useState(false)


    const handleRefreshLiveOngoingQuizzes = ()=>{        
        setRefreshingOngoingQuizzes(true)
        backendQueryUpdateOngoingQuizzes(classroomIndex, {callback: (isOngoing, updatedClassroom) => {
          setRefreshingOngoingQuizzes(isOngoing);
          setClassroom(updatedClassroom);
        }}, props.globalQuizngagedId);
    }
    const handleViewLiveOngoingQuiz = ()=>{}

    return(
        <div>
            <Container>
                {(classroom==undefined)?
                (
                    <div>Data error</div>
                )
                :
                (classroom.ongoingLiveQuizzes.length==0)?
                (
                    <Container>
                        <Grid container display={'grid'} justifyContent={'center'}>
                            <Grid item textAlign={'center'}>                                
                                <IconButton size="large" onClick={handleRefreshLiveOngoingQuizzes}>
                                    <RefreshIcon color='primary' size="large"></RefreshIcon>
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <Typography variant='h4'>
                                    No active quizzes at this time
                                </Typography>
                            </Grid>
                        </Grid>
                    </Container>
                    
                )
                :
                (
                    (props.userIsStudent)?
                    (
                        <Box paddingBottom="100px">
                        <Grid container spacing={2}display={'flex'}>                        
                            <Grid item textAlign={'center'} width={'100%'}>                                
                                <IconButton size="large" onClick={handleRefreshLiveOngoingQuizzes} disabled={refreshingOngoingQuizzes}>
                                    <RefreshIcon color={refreshingOngoingQuizzes?'grey':'primary'} size="large"></RefreshIcon>
                                </IconButton>
                            </Grid>
                        {
                            classroom.ongoingLiveQuizzes.map((ongoingLiveQuiz)=>
                            <Grid item xs={12} md={6} lg={4} key={ongoingLiveQuiz.launchedquizid}>
                                <CustomPaperReactComponent elevation={3}>                            
                                <Typography variant='h5' inline>
                                    #{ongoingLiveQuiz.launchedquizid+" "+(ongoingLiveQuiz.quizjson.eventDescription.length == 0 ? "[No description]" : ongoingLiveQuiz.quizjson.eventDescription)}
                                </Typography>
                                <Typography variant='subtitle1'>
                                    {"Title: "+ongoingLiveQuiz.quizjson.quizTitle}
                                </Typography>     
                                <Button size="small" onClick={(event) => Router.push(`/quiz?id=${ongoingLiveQuiz.launchedquizid}` )}>JOIN</Button>                                                 
                                </CustomPaperReactComponent>
                            </Grid>      
                            )
                        }
                        </Grid>              
                        </Box>
                    )
                    :
                    (
                        <Box paddingBottom="100px">        
                        <Grid container spacing={2}display={'grid'}>
                        {         
                            classroom.ongoingLiveQuizzes.map((ongoingLiveQuiz)=>
                            <Grid item xs={12} md={6} lg={4} key={ongoingLiveQuiz.launchedquizid}>
                                <CustomPaperReactComponent elevation={3}>                            
                                <Typography variant='h5' inline>
                                    #{ongoingLiveQuiz.launchedquizid+" "+(ongoingLiveQuiz.quizjson.eventDescription.length == 0 ? "[No description]" : ongoingLiveQuiz.quizjson.eventDescription)}
                                </Typography>
                                <Typography variant='subtitle1'>
                                    {"Title: "+ongoingLiveQuiz.quizjson.quizTitle}
                                </Typography>                            
                                <Button size="small" onClick={(event) => handleViewLiveOngoingQuiz(event, ongoingLiveQuiz.id)}>VIEW</Button>
                                {/* <Button size="small" onClick={(event) => handleEditClassroom(event, classroom.id)}>EDIT</Button> */}
                                </CustomPaperReactComponent>
                            </Grid>      
                            )
                        }                        
                        </Grid>
                        </Box>
                    )
                )}
            </Container>
        </div>
    )
}