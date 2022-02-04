import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';


import BoltIcon from '@mui/icons-material/Bolt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BarChartIcon from '@mui/icons-material/BarChart';

import ViewClassroomResults from './viewClassroomResults.js'
import ViewClassroomStatistics from './viewClassroomStatistics.js'
import LaunchClassroomQuiz from './launchClassroomQuiz.js'
import ViewClassroomOngoingQuizzes from './viewClassroomOngoingQuizzes.js'

import backendQueryGetUserJSON from '../customFunctions/backendQueries/backendQueryGetUserJSON.js';

import LiveTvIcon from '@mui/icons-material/LiveTv';

export default function ViewClassroom(props){

    const handleViewClassroomOngoingQuizzesChange = ()=>{
        props.setTopBarTitle("Live Ongoing quizzes")
        props.setViewClassroomOngoingQuizzesState(true)
    }    
    const handleLaunchClassroomQuizChange = ()=>{
        props.setTopBarTitle("Launch Quiz")
        props.setLaunchClassroomQuizState(true)
    }
    const handleViewClassroomResultsChange = ()=>{
        props.setTopBarTitle("Classroom Results")
        props.setViewClassroomResultsState(true)
    }
    const handleViewClassroomStatisticsChange = ()=>{
        props.setTopBarTitle("Classroom Statistics")
        props.setViewClassroomStatisticsState(true)
    }    

    const handleStudentWantsToJoinAQuiz = ()=>{
        props.setTopBarTitle("Join a Quiz")
        backendQueryGetUserJSON({callback:()=>{}})
        props.setViewClassroomOngoingQuizzesState(true)
    }
    
    return(
        <div>
            {(props.viewClassroomStatisticsState)?(
                <ViewClassroomStatistics ></ViewClassroomStatistics>
            )
            :
            (props.launchClassroomQuizState)?
            (
                <LaunchClassroomQuiz viewClassroomUID={props.viewClassroomUID} launchClassroomQuizState={props.launchClassroomQuizState} setLaunchClassroomQuizState={props.setLaunchClassroomQuizState}></LaunchClassroomQuiz>
            )
            :
            (props.viewClassroomResultsState)?
            (
                <ViewClassroomResults></ViewClassroomResults>
            )
            :
            (props.viewClassroomOngoingQuizzesState)?
            (
                <ViewClassroomOngoingQuizzes viewClassroomUID={props.viewClassroomUID}></ViewClassroomOngoingQuizzes>
            )
            :
            (props.userIsStudent)?
            (
                <Container>
                    <Grid Container display={'grid'}>                        
                        <Grid item marginBottom={'1em'}>
                            <Paper elevation={3}>
                                <Grid Container display={'flex'} /* justifyContent={'center'}  */alignContent={'center'} alignItems={'center'}>
                                    <Grid item textAlign={'center'} sx={{background:'#1976d2',padding:'1em'}}>
                                        <BoltIcon sx={{ fontSize: 100, color:'white'}}/>
                                    </Grid>
                                    <Grid item right={'0.1em'}>
                                        <Button sx={{ marginLeft:'1em',fontSize:'1em'}} onClick={handleStudentWantsToJoinAQuiz}>
                                            Join quiz
                                        </Button>
                                    </Grid>                            
                                </Grid>
                            </Paper>
                        </Grid>                        
                        <Grid item marginBottom={'1em'} /* minHeight={'30vh'} */>
                            <Paper elevation={3}>
                                <Grid Container display={'flex'} alignContent={'center'} alignItems={'center'} /* minHeight={'30vh'} */>
                                    <Grid item textAlign={'center'} left={'0.1em'} sx={{background:'#1976d2',padding:'1em'}}>
                                        <VisibilityIcon sx={{fontSize:100, color:'white'}}/>
                                    </Grid>
                                    <Grid item margin={'0.1em'} textAlign={'center'} >
                                            <Button sx={{
                                                marginLeft:'1em',fontSize:'1em'}} onClick={handleViewClassroomResultsChange}>
                                            View results
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Paper elevation={3}>
                                <Grid Container display={'flex'} alignContent={'center'} alignItems={'center'}>
                                    <Grid item textAlign={'center'} left={'0.1em'} sx={{background:'#1976d2',padding:'1em'}}>
                                        <BarChartIcon sx={{fontSize:100, color:'white'}}/>
                                    </Grid>
                                    <Grid item margin={'0.1em'} textAlign={'center'} >
                                        <Button sx={{marginLeft:'1em',fontSize:'1em'}} onClick={handleViewClassroomStatisticsChange}>
                                            View statistics
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>                
                    </Grid>
                </Container>
            )
            :
            (
                <Container>
                    <Grid Container display={'grid'}>
                        <Grid item marginBottom={'1em'}>
                            <Paper elevation={3}>
                                <Grid Container display={'flex'} /* justifyContent={'center'}  */alignContent={'center'} alignItems={'center'}>
                                    <Grid item textAlign={'center'} sx={{background:'#1976d2',padding:'1em'}}>
                                        <BoltIcon sx={{ fontSize: 100, color:'white'}}/>
                                    </Grid>
                                    <Grid item right={'0.1em'}>
                                        <Button sx={{ marginLeft:'1em',fontSize:'1em'}} onClick={handleLaunchClassroomQuizChange}>
                                            Launch quiz
                                        </Button>
                                    </Grid>                            
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item marginBottom={'1em'}>
                            <Paper elevation={3}>
                                <Grid Container display={'flex'} /* justifyContent={'center'}  */alignContent={'center'} alignItems={'center'}>
                                    <Grid item textAlign={'center'} sx={{background:'#1976d2',padding:'1em'}}>
                                        <LiveTvIcon sx={{ fontSize: 100, color:'white'}}/>
                                    </Grid>
                                    <Grid item right={'0.1em'}>
                                        <Button sx={{ marginLeft:'1em',fontSize:'1em'}} onClick={handleViewClassroomOngoingQuizzesChange}>
                                            View ongoing live quizzes
                                        </Button>
                                    </Grid>                            
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item marginBottom={'1em'} /* minHeight={'30vh'} */>
                            <Paper elevation={3}>
                                <Grid Container display={'flex'} alignContent={'center'} alignItems={'center'} /* minHeight={'30vh'} */>
                                    <Grid item textAlign={'center'} left={'0.1em'} sx={{background:'#1976d2',padding:'1em'}}>
                                        <VisibilityIcon sx={{fontSize:100, color:'white'}}/>
                                    </Grid>
                                    <Grid item margin={'0.1em'} textAlign={'center'} >
                                            <Button sx={{
                                                marginLeft:'1em',fontSize:'1em'}} onClick={handleViewClassroomResultsChange}>
                                            View results
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Paper elevation={3}>
                                <Grid Container display={'flex'} alignContent={'center'} alignItems={'center'}>
                                    <Grid item textAlign={'center'} left={'0.1em'} sx={{background:'#1976d2',padding:'1em'}}>
                                        <BarChartIcon sx={{fontSize:100, color:'white'}}/>
                                    </Grid>
                                    <Grid item margin={'0.1em'} textAlign={'center'} >
                                        <Button sx={{marginLeft:'1em',fontSize:'1em'}} onClick={handleViewClassroomStatisticsChange}>
                                            View statistics
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>                
                    </Grid>
                </Container>
            )}
        </div>
    )
}