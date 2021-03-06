import * as React from 'react';

/* mui libraries */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

/* customComponents */
import CustomPaperReactComponent from '../customComponents/customPaperReactComponent.js';
import StyledFab from '../customComponents/styledFab.js';
import LoadingScreen from '../customComponents/loadingScreen.js';
import CustomTopNavBar from '../customComponents/customTopNavBar'
import EditQuiz from '../customComponents/editQuiz.js';
import AddQuizz from '../customComponents/addQuizz.js';
import DeleteDialog from '../customComponents/deleteDialog.js';

/* global variables, customFunctions, router */
import globalUserIsAuthenticated from '../customGlobalVariables/userIsAuthenticated';
import backendQuerySaveUserJSON from '../customFunctions/backendQueries/backendQuerySaveUserJSON.js';
import backendQueryGetUserJSON from '../customFunctions/backendQueries/backendQueryGetUserJSON.js';
import { useRouter } from 'next/router'

function MyQuizzes(props) {  

  const router = useRouter()

  const [statefulUserObject, setStatefulUserObject] = React.useState({});

  const [editQuizState, setEditQuizState] = React.useState(false);

  const [addQuizState, setAddQuizState] = React.useState();

  const [listOfQuizzes,setListOfQuizzes] = React.useState(null);

  const [newQuizUID,setNewQuizUID] = React.useState(null)
  const [editQuizUID,setEditQuizUID] = React.useState(null)

  const [userIsStudent,setUserIsStudent] = React.useState(true)
  

  React.useEffect(()=>{
    if(window.location.pathname.localeCompare("/my-quizzes")!=0){
      window.location.pathname = "/my-quizzes"
    }
    if((localStorage.federatedAuthUserData)==null || localStorage.federatedAuthUserData==undefined){
      router.push('/')
    }else{
      setStatefulUserObject(JSON.parse(localStorage.federatedAuthUserData))
      backendQueryGetUserJSON({callback:(response)=>{setStatefulQuizngagedUserData(response)}})
    }
        
    if(JSON.parse(localStorage.quizngagedUserData).userType.localeCompare('Student')!=0){
      setUserIsStudent(false)
    }
    else{
      router.push('/my-classrooms')
    }
  },[addQuizState,editQuizState])


  const [statefulQuizngagedUserData, setStatefulQuizngagedUserData] = React.useState({});

  const [topBarTitle,setTopBarTitle] = React.useState("My Quizzes")

  //  const deleteQuiz = ( ev, id)=> {
   const deleteQuiz = (id)=> {  
      let updatedList = listOfQuizzes.filter( (el)=> { return el.id!=id})
      // update UI 
      //ex. we have three quizzes with id's 0, 1 and 2, if we delete the quiz with id 1
      //we need to update the quiz with id 2 with id 1
      //id's have to be updated according to the position of the array
      //otherwise when launching a quiz it will choose a wrong quiz or throw an error because the
      //position of the quiz does not match with the chosen quiz or it does not exist
      for(let i= 0; i< updatedList.length; i++){
        updatedList[i].id = i
      }
      setListOfQuizzes(updatedList)
      //create a copy from localstorage
      let copyOfQuizngagedUserData = JSON.parse(localStorage.quizngagedUserData)
      //save the edited quizzes list to  the copy
      copyOfQuizngagedUserData.quizzes = updatedList
      //replace the old data with the new data in localstorage
      localStorage.setItem('quizngagedUserData',JSON.stringify(copyOfQuizngagedUserData))   
      
      // sync data with backend
      backendQuerySaveUserJSON(()=>{})
    
  }
  const handleAddQuizState = (event, lastIndexOfListOfQuizzes) => {
    
    if(listOfQuizzes.length > 0){
      let copyOfStatefulArray = JSON.parse(JSON.stringify(listOfQuizzes));        
      
      setNewQuizUID(parseInt(copyOfStatefulArray[copyOfStatefulArray.length-1].id) + 1 )
      
    } else {
         setNewQuizUID(0);
    }
          

    

    setAddQuizState(true);
    setTopBarTitle("Add Quiz")
  }

  const handleEditQuizState = (event, index) => {    
    setEditQuizUID(index)
    setEditQuizState(true);
    setTopBarTitle("Edit Quiz");
  }

  const handleOpenQuizzState = (event) => {
  }  

  return (    
      
      (statefulQuizngagedUserData.quizzes==undefined || userIsStudent==true)?
      (
        <LoadingScreen></LoadingScreen>
      )
      :
      (listOfQuizzes==null)?
      (
        <div>
        {          
        setListOfQuizzes(statefulQuizngagedUserData.quizzes)}
        {console.log("setting")}
        <LoadingScreen></LoadingScreen>
        </div>
      )
      :      
      (
        <div style={{          
          overflowY: 'hidden',
          overflowX: 'hidden',          
          minHeight: '100vh',
          maxHeight: '100vh',  
        }}>
          <CustomTopNavBar statefulUserObject={statefulUserObject} setStatefulUserObject={setStatefulUserObject} goBackIconState={editQuizState || addQuizState} topBarTitle={topBarTitle} setTopBarTitle={setTopBarTitle} editQuizState={editQuizState}setEditQuizState={setEditQuizState} addQuizState={addQuizState} setAddQuizState={setAddQuizState}></CustomTopNavBar>
          {/* <CustomTopNavBar statefulUserObject={statefulUserObject} setStatefulUserObject={setStatefulUserObject} topBarTitle={topBarTitle} setTopBarTitle={setTopBarTitle}></CustomTopNavBar> */}
          <Container>
            {(editQuizState)?(
              <Box paddingTop="1em" paddingBottom="100px">
                <EditQuiz listOfQuizzes={listOfQuizzes} setListOfQuizzes={setListOfQuizzes} editQuizUID={editQuizUID} setEditQuizState={setEditQuizState} editQuizState={editQuizState} setTopBarTitle={setTopBarTitle}/>
              </Box> 
            )
            :
            (addQuizState)?
            (<Box paddingTop="1em" paddingBottom="100px">
              <AddQuizz listOfQuizzes={listOfQuizzes} setListOfQuizzes={setListOfQuizzes} newQuizUID={newQuizUID} setAddQuizState={setAddQuizState} setTopBarTitle={setTopBarTitle}/>
              </Box>)
            : 
            (<Box paddingTop="1em" paddingBottom="100px">
              <Grid container spacing={2}>
                {
                  listOfQuizzes.map((quiz)=>                 
                    <Grid item xs={12} md={6} lg={4} key={listOfQuizzes.indexOf(quiz)}>              
                      <CustomPaperReactComponent elevation={3}>                  
                        <Typography variant='h6'>
                            #{quiz.id}
                          </Typography>
                        <Typography variant='subtitle1'>                    
                          Quiz Title: {quiz.quizTitle}
                        </Typography>
                        <Typography variant='subtitle1'>                    
                          Number of questions: {quiz.questions.length}
                        </Typography>
                        <Button size="large" onClick={(event) => handleEditQuizState(event, quiz.id)} endIcon={<EditIcon />}>EDIT</Button>
                        <DeleteDialog dialogTitle = {"Delete Quiz?"} message="You will be deleting your quiz contents." deleteFunction={deleteQuiz} entityId={quiz.id}/>
                      </CustomPaperReactComponent>
                    </Grid>      
                  )
                }
              </Grid>
            </Box>)}
          </Container>
          {
            (addQuizState)?
            (<div></div>)
            :
            (editQuizState)?
            (<div></div>)
            :
            (
              <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar>          
                  <StyledFab color="secondary" aria-label="add" onClick={(event)=>handleAddQuizState(event, listOfQuizzes.length)}>
                    <AddIcon />
                  </StyledFab>          
                </Toolbar>
              </AppBar>
            )
          }
        </div>
      )    
  )
}

MyQuizzes.getInitialProps = async (ctx) => {
  /* const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const json = await res.json()
  return { stars: json.stargazers_count } */
  console.log("before load!", ctx)
  return {}
  
}

export default MyQuizzes
