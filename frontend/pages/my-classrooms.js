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

import Index from './index.js'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import globalUserIsAuthenticated from '../customGlobalVariables/userIsAuthenticated';
import firebaseClientConfig from '../customGlobalVariables/firebaseClientConfig';

import CustomTopNavBar from '../customComponents/customTopNavBar'

import AddClassroom from '../customComponents/addClassroom'
import EditClassroom from '../customComponents/editClassroom'
import ViewClassroom from '../customComponents/viewClassroom.js';

import backendQueryGetUserJSON from '../customFunctions/backendQueries/backendQueryGetUserJSON.js';
//import quizngagedUserData from '../customGlobalVariables/quizngagedUserData.js';
import { useRouter } from 'next/router'


export default function MyClassrooms() {

  const router = useRouter()

  const [addClassroomState,setAddClassroomState] = React.useState(false)
  const [editClassroomState,setEditClassroomState] = React.useState(false)
  const [viewClassroomState,setViewClassroomState] = React.useState(false)
  
  const [statefulUserObject, setStatefulUserObject] = React.useState({});
  
  const [statefulQuizngagedUserData, setStatefulQuizngagedUserData] = React.useState({});

  React.useEffect(()=>{
    if(window.location.pathname.localeCompare("/my-classrooms")!=0){
      window.location.pathname = "/my-classrooms"
    }
    if((localStorage.federatedAuthUserData)==null || localStorage.federatedAuthUserData==undefined){
      router.push('/')
    }/* else if(localStorage.quizngagedUserData==null || localStorage.quizngagedUserData==undefined){
      router.push('/')
    } */else{
      setStatefulUserObject(JSON.parse(localStorage.federatedAuthUserData))
      backendQueryGetUserJSON({callback:setStatefulQuizngagedUserData})
    }
    
  },[addClassroomState,editClassroomState])

  const [topBarTitle,setTopBarTitle] = React.useState("My Classroooms")

  const [newClassroomUID,setNewClassroomUID] = React.useState(null)
  const [editClassroomUID,setEditClassroomUID] = React.useState(null)
  const [viewClassroomUID,setViewClassroomUID] = React.useState(null)

  const handleOpenClassroom = ()=>{
  }

  const handleEditClassroom = (event,index)=>{    
    setEditClassroomUID(index)
    setEditClassroomState(true);
    setTopBarTitle("Edit Classroom");
  }

  const handleViewClassroom = (event,index)=>{    
    setViewClassroomUID(index)
    setViewClassroomState(true);
    setTopBarTitle("Classroom");
  }

  const handleAddClassroom = ()=>{    
    let copyOfStatefulArray = JSON.parse(JSON.stringify(statefulQuizngagedUserData.classrooms));        

    setNewClassroomUID(parseInt(copyOfStatefulArray[copyOfStatefulArray.length-1].id) + 1 )

    setAddClassroomState(true);
    setTopBarTitle("Add Classroom")
  }

  return (                
      (statefulQuizngagedUserData.classrooms==undefined)?
      (
        <div>        
        <LoadingScreen></LoadingScreen>
        </div>
      ) 
      :
      (
        <div>          
          <CustomTopNavBar statefulUserObject={statefulUserObject} setStatefulUserObject={setStatefulUserObject} topBarTitle={topBarTitle} setTopBarTitle={setTopBarTitle} addClassroomState={addClassroomState} setAddClassroomState={setAddClassroomState} editClassroomState={editClassroomState} setEditClassroomState={setEditClassroomState} viewClassroomState={viewClassroomState} setViewClassroomState={setViewClassroomState} goBackIconState={addClassroomState || editClassroomState || viewClassroomState}></CustomTopNavBar>
          <Container>
          {(editClassroomState)?
          (
            <Box paddingTop="1em">
              <EditClassroom editClassroomUID={editClassroomUID} editClassroomState={editClassroomState} setEditClassroomState={setEditClassroomState}></EditClassroom>
            </Box>
          )
          :
          (addClassroomState)?
          (
            
              <Box paddingTop="1em">
                <AddClassroom newClassroomUID={newClassroomUID} addClassroomState={addClassroomState} setAddClassroomState={setAddClassroomState}></AddClassroom>
              </Box>
          )
          :
          (viewClassroomState)?
          (
            
              <Box paddingTop="1em">
                <ViewClassroom newClassroomUID={newClassroomUID} addClassroomState={addClassroomState} setAddClassroomState={setAddClassroomState}></ViewClassroom>
              </Box>
          )
          :
          (
            <Box paddingTop="1em" paddingBottom="100px">
              <Grid container spacing={2}>
              {
                statefulQuizngagedUserData.classrooms.map((classroom)=>                 
                  <Grid item xs={12} md={6} lg={4} key={statefulQuizngagedUserData.classrooms.indexOf(classroom)}>              
                    <CustomPaperReactComponent elevation={3}>
                      <Typography variant='subtitle1'>
                        #{classroom.id}
                      </Typography>
                      <Typography variant='h5'>
                        {classroom.name}
                      </Typography>                      
                      <Button size="small" onClick={(event) => handleViewClassroom(event, classroom.id)}>OPEN</Button>
                      <Button size="small" onClick={(event) => handleEditClassroom(event, classroom.id)}>EDIT</Button>
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
                <StyledFab color="secondary" aria-label="add" onClick={(event)=>handleAddClassroom(event, statefulQuizngagedUserData.classrooms.length)}>
                  <AddIcon />
                </StyledFab>          
              </Toolbar>
            </AppBar>
          )}
        </div>
      )
  )
}

