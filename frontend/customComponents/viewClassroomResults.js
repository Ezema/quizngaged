import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CustomPaperReactComponent from './customPaperReactComponent.js';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import Typography from '@mui/material/Typography';

import backendQueryStudentsQuizzesForClassroom from '../customFunctions/backendQueries/backendQueryStudentsQuizzesForClassroom';

export default function ViewClassroomResults(props){

  const classRoomJson = JSON.parse(localStorage.quizngagedUserData).classrooms[props.viewClassroomUID];
  const [studentData, setStudentData] = React.useState([])

  React.useEffect(()=>{
    console.log("data after load: ", classRoomJson);
    console.log("classroom global id="+classRoomJson.globalQuizngagedId);
    fetchData();
  },[])

  const fetchData = async () => {
    try{
      backendQueryStudentsQuizzesForClassroom(classRoomJson.globalQuizngagedId, {callback: (studentResults) => {
          console.log("ViewClassroomResults.fetchData: studentResults:", studentResults);
          setStudentData(studentResults);
          // if (quizResult.launchedquizid == qid) {
          //   parseQuizData(quizResult);
          //   console.log("quiz.js - backendQueryGetQuiz: returned student answers: ", previousAnswers);
          //   setTempPrevAnswers({userquizzid: previousAnswers.userquizzid, answersjson: previousAnswers.answersjson});
          // }
          // else {
          //   console.log("quiz id returned invalid");
          //   loadDummyData();
          // }
        }
      });

    } catch (err) {
      console.log('ViewClassroomResults: data fetch error', err);
      // loadDummyData();
    }
  }


  return(
    <div>
      { props.userIsStudent ? 
      (
        <div>Student view not implemented yet</div>
      )
      : (studentData.length == 0) ?
      (
        <Container>
          <Grid container display={'grid'} justifyContent={'center'}>
              <Grid item textAlign={'center'}>
                  <IconButton size="large" onClick={fetchData}>
                      <RefreshIcon color='primary' size="large"></RefreshIcon>
                  </IconButton>
              </Grid>
              <Grid item>
                  <Typography variant='h4'>
                      Classroom has no students
                  </Typography>
              </Grid>
          </Grid>
        </Container>
      )
      : 
      (
        <Box paddingBottom="100px">        
        <Grid container spacing={2}display={'grid'}>
        {         
            studentData.map((student)=>
              <Grid item xs={12} md={6} lg={4} key={student.uid}>
                <CustomPaperReactComponent elevation={3}>                            
                <Typography variant='h5' inline>
                    {student.name}
                </Typography>
                <Typography variant='subtitle1' inline>
                    { typeof(student.quizTitle) == 'undefined' ? "[No quizzes yet]" 
                    : student.quizDescription.length == 0 ? "" : student.quizDescription}
                </Typography>
                  { typeof(student.quizTitle) != 'undefined' ?
                    <Typography variant='subtitle1'>
                        {"Title: "+student.quizTitle}
                    </Typography>
                  
                  : ""}
                {/* <Button size="small" onClick={(event) => handleViewLiveOngoingQuiz(event, student.id)}>VIEW</Button> */}
                {/* <Button size="small" onClick={(event) => handleEditClassroom(event, classroom.id)}>EDIT</Button> */}
                </CustomPaperReactComponent>
              </Grid>      
            )
        }                        
        </Grid>
        </Box>
)}
    </div>
  )
}