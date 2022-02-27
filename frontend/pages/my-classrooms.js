import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CustomPaperReactComponent from '../customComponents/customPaperReactComponent.js';
import StyledFab from '../customComponents/styledFab.js';

import LoadingScreen from '../customComponents/loadingScreen.js'
import CustomTopNavBar from '../customComponents/customTopNavBar'
import AddClassroom from '../customComponents/addClassroom'
import EditClassroom from '../customComponents/editClassroom'
import ViewClassroom from '../customComponents/viewClassroom.js';
import TeacherTutorial from '../customComponents/teacherTutorial.js';
import StudentTutorial from '../customComponents/studentTutorial.js';

import 'firebase/compat/auth';

import backendQueryGetUserJSON from '../customFunctions/backendQueries/backendQueryGetUserJSON.js';

import { useRouter } from 'next/router'


export default function MyClassrooms() {

  const router = useRouter()

  const [addClassroomState,setAddClassroomState] = React.useState(false)
  const [editClassroomState,setEditClassroomState] = React.useState(false)
  const [viewClassroomState,setViewClassroomState] = React.useState(false)

  const [launchClassroomQuizState,setLaunchClassroomQuizState] = React.useState(false)
  const [viewClassroomResultsState,setViewClassroomResultsState] = React.useState(false)
  const [viewClassroomStatisticsState,setViewClassroomStatisticsState] = React.useState(false)
  const [viewClassroomOngoingQuizzesState,setViewClassroomOngoingQuizzesState] = React.useState(false)
  
  const [statefulUserObject, setStatefulUserObject] = React.useState({});

  const [topBarTitle,setTopBarTitle] = React.useState("My Classroooms")

  const [newClassroomUID,setNewClassroomUID] = React.useState(null)
  const [editClassroomUID,setEditClassroomUID] = React.useState(null)
  const [viewClassroomUID,setViewClassroomUID] = React.useState(null)
  const [viewClassroomGlobalQuizngagedId,setViewClassroomGlobalQuizngagedId] = React.useState(null)

  const [userIsStudent,setUserIsStudent] = React.useState(true)

  const [canRender,setCanRender] = React.useState(false)

  React.useEffect(()=>{
    if((localStorage.federatedAuthUserData)==null || localStorage.federatedAuthUserData==undefined){
      router.push('/')
    }else{
      if(localStorage.quizngagedUserData==undefined){
        setStatefulUserObject(JSON.parse(localStorage.federatedAuthUserData))
        backendQueryGetUserJSON({callback:(response)=>{console.log(response)}})
      }else{        
        if(JSON.parse(localStorage.quizngagedUserData).classrooms){
          setCanRender(true)
          if(JSON.parse(localStorage.quizngagedUserData).userType.localeCompare('Student')!=0){
            setUserIsStudent(false)
          }
        if(window.location.pathname.localeCompare("/my-classrooms")!=0){
            window.location.pathname = "/my-classrooms"
        }
        }        
      }   
    }        
  },[addClassroomState,editClassroomState,statefulUserObject,userIsStudent])

  const handleEditClassroom = (event,index)=>{    
    setEditClassroomUID(index)
    setEditClassroomState(true);
    setTopBarTitle("Edit Classroom");
  }

  const handleViewClassroom = (event,index,globalQuizngagedId)=>{    
    setViewClassroomUID(index)
    setViewClassroomGlobalQuizngagedId(globalQuizngagedId);
    setViewClassroomState(true);
    setTopBarTitle("Classroom");
  }

  const handleAddClassroom = ()=>{    
    let copyOfStatefulArray = JSON.parse(JSON.stringify(JSON.parse(localStorage.quizngagedUserData).classrooms));        

    if(copyOfStatefulArray.length==0){
      setNewClassroomUID(0)
    }else{
      setNewClassroomUID(parseInt(copyOfStatefulArray[copyOfStatefulArray.length-1].id) + 1 )
    }

    setAddClassroomState(true);

    if(userIsStudent){
      setTopBarTitle("Join a Classroom")  
    }else{
      setTopBarTitle("Add Classroom")
    }
    
  }

  return (                
      (!canRender)?
      (
        <div>        
        <LoadingScreen></LoadingScreen>
        </div>
      ) 
      :
      (
        <div>          
          <CustomTopNavBar statefulUserObject={statefulUserObject} setStatefulUserObject={setStatefulUserObject} topBarTitle={topBarTitle} setTopBarTitle={setTopBarTitle} addClassroomState={addClassroomState} setAddClassroomState={setAddClassroomState} editClassroomState={editClassroomState} setEditClassroomState={setEditClassroomState} viewClassroomState={viewClassroomState} setViewClassroomState={setViewClassroomState} viewClassroomStatisticsState={viewClassroomStatisticsState} setViewClassroomStatisticsState={setViewClassroomStatisticsState} viewClassroomResultsState={viewClassroomResultsState} setViewClassroomResultsState={setViewClassroomResultsState} launchClassroomQuizState={launchClassroomQuizState} setLaunchClassroomQuizState={setLaunchClassroomQuizState} viewClassroomOngoingQuizzesState={viewClassroomOngoingQuizzesState} setViewClassroomOngoingQuizzesState={setViewClassroomOngoingQuizzesState}
          goBackIconState={addClassroomState || editClassroomState || viewClassroomState || viewClassroomStatisticsState || viewClassroomResultsState || launchClassroomQuizState || viewClassroomOngoingQuizzesState}></CustomTopNavBar>
          <Container>
          {(editClassroomState)?
          (
            <Box paddingTop="1em">
              <EditClassroom editClassroomUID={editClassroomUID} editClassroomState={editClassroomState} setEditClassroomState={setEditClassroomState} setTopBarTitle={setTopBarTitle}></EditClassroom>
            </Box>
          )
          :
          (addClassroomState)?
          (
            
              <Box paddingTop="1em">
                <AddClassroom userIsStudent={userIsStudent} newClassroomUID={newClassroomUID} addClassroomState={addClassroomState} setAddClassroomState={setAddClassroomState} setTopBarTitle={setTopBarTitle}></AddClassroom>
              </Box>
          )
          :
          (viewClassroomState)?
          (
            
              <Box paddingTop="1em">
                <ViewClassroom userIsStudent={userIsStudent} viewClassroomUID={viewClassroomUID} viewClassroomGlobalQuizngagedId={viewClassroomGlobalQuizngagedId} viewClassroomState={viewClassroomState} setViewClassroomState={setViewClassroomState} 
                topBarTitle={topBarTitle} setTopBarTitle={setTopBarTitle}
                launchClassroomQuizState={launchClassroomQuizState} setLaunchClassroomQuizState={setLaunchClassroomQuizState} 
                viewClassroomResultsState={viewClassroomResultsState}
                setViewClassroomResultsState={setViewClassroomResultsState}
                viewClassroomStatisticsState={viewClassroomStatisticsState} setViewClassroomStatisticsState={setViewClassroomStatisticsState}viewClassroomOngoingQuizzesState={viewClassroomOngoingQuizzesState} setViewClassroomOngoingQuizzesState={setViewClassroomOngoingQuizzesState}
                ></ViewClassroom>
              </Box>
          )
          :          
          (
            <Box paddingTop="1em" paddingBottom="100px">              
              <Grid container spacing={2}>
              {
                userIsStudent?
                (
                  JSON.parse(localStorage.quizngagedUserData).classrooms.length==0
                  ? <StudentTutorial />
                  :
                  (
                  JSON.parse(localStorage.quizngagedUserData).classrooms.map((classroom)=>                 
                    <Grid item xs={12} md={6} lg={4} key={classroom.globalQuizngagedId}>
                      <CustomPaperReactComponent elevation={3}>                      
                        <Typography variant='subtitle1'>
                          #{classroom.globalQuizngagedId}
                        </Typography>
                        <Typography variant='h5'>
                          {classroom.name}
                        </Typography>                      
                        <Button size="small" onClick={(event) => handleViewClassroom(event, classroom.id,classroom.globalQuizngagedId)}>OPEN</Button>
                        {(userIsStudent)?null:<Button size="small" onClick={(event) => handleEditClassroom(event, classroom.id)}>EDIT</Button>}
                      </CustomPaperReactComponent>
                    </Grid>      
                  )
                  )  
                ) 
                : JSON.parse(localStorage.quizngagedUserData).classrooms.length==0
                ? <TeacherTutorial/>
                : JSON.parse(localStorage.quizngagedUserData).classrooms.map((classroom)=>                 
                    <Grid item xs={12} md={6} lg={4} key={JSON.parse(localStorage.quizngagedUserData).classrooms.indexOf(classroom)}>              
                      <CustomPaperReactComponent elevation={3}>
                        <Typography variant='subtitle1'>
                          #{classroom.id}
                        </Typography>
                        <Typography variant='h5'>
                          {classroom.name}
                        </Typography>                      
                        <Button size="small" onClick={(event) => handleViewClassroom(event, classroom.id,classroom.globalQuizngagedId)}>OPEN</Button>
                        {(userIsStudent)?null:<Button size="small" onClick={(event) => handleEditClassroom(event, classroom.id)}>EDIT</Button>}
                      </CustomPaperReactComponent>
                    </Grid>      
                  )
              }
              </Grid>              
            </Box>            
          )}
          </Container>
          {(editClassroomState)?
          (
            <div></div>
          )
          :
          (addClassroomState)?
          (
            <div></div>
          )
          :
          (viewClassroomState)?
          (
            <div></div>
          )
          :
          (
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
              <Toolbar>          
                <StyledFab color="secondary" aria-label="add" onClick={(event)=>handleAddClassroom(event, JSON.parse(localStorage.quizngagedUserData).classrooms.length)}>
                  <AddIcon />
                </StyledFab>          
              </Toolbar>
            </AppBar>
          )}
        </div>
      )
  )
}

