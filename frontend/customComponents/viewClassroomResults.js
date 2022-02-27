import * as React from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import CustomPaperReactComponent from './customPaperReactComponent.js';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import Typography from '@mui/material/Typography';

import backendQueryStudentsQuizzesForClassroom from '../customFunctions/backendQueries/backendQueryStudentsQuizzesForClassroom';

export default function ViewClassroomResults(props){

  const parsedUser = JSON.parse(localStorage.quizngagedUserData);
  const classRoomJson = parsedUser.classrooms[props.viewClassroomUID];
  const [studentData, setStudentData] = React.useState([]);

  React.useEffect(()=>{
    fetchData();
  },[])

  const fetchData = async () => {
    try {
      backendQueryStudentsQuizzesForClassroom(classRoomJson.globalQuizngagedId, 
        props.userIsStudent ? parsedUser.uid : null,
        {callback: (studentResults) => {
          console.log("ViewClassroomResults.fetchData: studentResults:", studentResults);
          setStudentData(studentResults);
          }
        });

    } catch (err) {
      console.log('ViewClassroomResults: data fetch error', err);
    }
  }

  return(
    <div>
      { props.userIsStudent 
        ? ""
        : <Grid container display={'grid'} justifyContent={'center'}>
            <Grid item textAlign={'center'}>
              <IconButton size="large" onClick={fetchData}>
                <RefreshIcon color='primary' size="large"></RefreshIcon>
              </IconButton>
            </Grid>
          </Grid>
      }
      { studentData.length == 0 ?
        <Grid container display={'grid'} justifyContent={'center'}>
          <Grid item>
            <Typography variant='h4'>{props.userIsStudent ? "You have not joined a quiz yet" : "Classroom has no students"}</Typography>
          </Grid>
        </Grid>
      : 
        <Grid container spacing={2} justifyContent={'flex-start'}>
          {
            studentData.map((student)=>
              <Grid item xs={12} md={6} lg={6} key={student.uid}>
                <CustomPaperReactComponent elevation={3}>                            
                  <Typography variant='h5' inline>{student.name}</Typography> 
                  { typeof(student.quizTitle) == 'undefined' 
                    ? <Typography variant='subtitle1' inline>[No quizzes yet]</Typography>
                    : <div>
                        { student.quizDescription.length == 0 
                        ? "" 
                        : <Typography variant='subtitle1'>{student.quizDescription}</Typography>
                        }
                        { typeof(student.quizTitle) == 'undefined' 
                        ? ""
                        : <Typography variant='subtitle1'>Title: {student.quizTitle} {student.quizState == 'IN_PROGRESS' ? "(in progress)" : ""}</Typography>
                        }
                      </div>
                  }
                </CustomPaperReactComponent>
                { typeof(student.quizTitle) == 'undefined' 
                  ? ""
                  : <Accordion elevation={3}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant='subtitle1'>{student.answersJson.numAnswersGiven}/{student.numQuestions} questions answered, score: {student.answersJson.score}</Typography>
                      </AccordionSummary>
                      { student.answersJson.numAnswersGiven == 0 
                        ? <AccordionDetails>
                            <Typography>No responses given yet</Typography>
                          </AccordionDetails>
                        : student.answersJson.analysedAnswers.map((answers)=> 
                            <AccordionDetails>
                              <Typography>
                                {answers.questionType}{answers.difficulty == 'base' ? "" : " ("+answers.difficulty+")"}:
                                "{answers.posedQuestion}"
                                </Typography>
                              <Typography>Answer given: "{answers.givenAnswer}"</Typography>
                              { answers.isGivenCorrect 
                              ? <Typography>CORRECT! - score: {answers.score}</Typography>
                              : <Typography>WRONG! Should be: "{answers.correctAnswer}"</Typography>
                              }
                            </AccordionDetails>
                          )
                      }
                    </Accordion>
                }
              </Grid>      
            )
          }
        </Grid>
      }
    </div>
  )
}