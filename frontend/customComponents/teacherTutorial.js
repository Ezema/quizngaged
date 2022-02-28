import * as React from 'react';

/* mui libraries */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Link from '@mui/material/Link';

// steps titles
const steps = [
  'Add Classroom',
  'Add Questions',
  'Add Quiz',
  'Open Classroom',
  'Launch Quiz',
  'View Results'
];

const LAST_STEP_IDX = steps.length -1;

export default function TeacherTutorial(props){

  const [step, setStep] = React.useState(0);

  const handlePreviousStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  }

  const handleNextStep = () => {
    if (step < LAST_STEP_IDX) {
      setStep(step + 1);
    }        
  }

  return (
    <div>
      {/* steps summary */}
      <Grid Container alignContent={'center'} display={'flex'} width={'95%'}>
        <Box marginTop="1em">
          <Stepper activeStep={step}>
            {steps.map((label) => (
              <Step key={label}>
                  <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Grid>

      {/* main text area */}
      <Container>
          {/* the body of the text */}
          <Box margin="1em">
              { step == 0 
              ? <Grid Container>
                  <Typography variant='h5'>Tutorial - Getting started</Typography>
                  <Typography>View the steps in this tutorial first (click Next until you get to the End)</Typography>
                    <Typography>Afterwards, you will need a classroom, at the end of the tutorial, click the icon at the bottom of this page</Typography>
                  <Grid Container display='grid' alignContent={'center'} justifyContent={'center'} width={'90%'}>
                    <img src='add-classroom-fab.png' alt={steps[step]+" image"} width='150px' style={{border:'1px dotted #000000'}} />
                  </Grid>
                  <Typography>First you will create questions for your quiz</Typography>
                  <Typography>Then add them to a quiz and launch it</Typography>
                  <Typography>Video tutorial here: <Link href="#" underline="hover">
                  https://youtu.be/uGLymlwfXrY
                </Link></Typography>
                
                </Grid>
              : step == 1
              ? <Grid Container>
                  <Grid Container columns={2} display={'flex'}>
                    <img src='my-questions-menu.png' alt={steps[step]+" image"} height='200px' style={{border:'1px dotted #000000'}} />
                    <Typography><ol>
                      <li>Enter the text for the question</li>
                      <li>Choose the appropriate type - Multiple choice/Binary (True/False)/Free text</li>
                      <li>Add the text for the possible answers</li>
                      <li>Select the correct answer</li>
                      <li>Add more correct answers if needed</li>
                      <li>Press Next step</li>
                      <li>Enter Easier/Harder variant(s) if desired (optional)</li>
                    </ol></Typography>
                  </Grid>
                  <Grid Container display='grid' alignContent={'center'} justifyContent={'center'} width={'90%'}>
                    <img src='add-question.png' alt={steps[step]+" image"} width='500px' style={{border:'1px dotted #000000'}} />
                  </Grid>
                </Grid>
              : step == 2
              ? <Grid Container>
                  <Grid Container columns={2} display={'flex'}>
                    <img src='my-quizzes-menu.png' alt={steps[step]+" image"} width='210px' style={{border:'1px dotted #000000'}} />
                    <Typography item><ol>
                      <li>Give the quiz a title</li>
                      <li>Assign a category</li>
                      <li>Choose questions to include</li>
                      <li>Press Next step</li>
                      <li>Enter Easier/Harder variant(s) if desired (optional)</li>
                    </ol></Typography>
                  </Grid>
                  <Grid Container display='grid' alignContent={'center'} justifyContent={'center'} width={'90%'}>
                    <img src='add-quiz.png' alt={steps[step]+" image"} width='500px' style={{border:'1px dotted #000000'}} />
                  </Grid>
                </Grid>
              : step == 3
              ? <Grid Container>
                  <Grid Container columns={2} display='flex' >
                    <Typography width={'30%'}>Choose 'My Classrooms' from the menu and open the new classroom you created</Typography>
                    <img src='open-classroom.png' alt={steps[step]+" image"}  height="100px" style={{border:'1px dotted #000000'}} />
                  </Grid>
                  <br/>
                  <Grid Container columns={2} display='flex'>
                    <Typography width={'30%'}>From here you can<ol>
                      <li>Launch a quiz</li>
                      <li>View ongoing quizzes</li>
                      <li>View results from quizzes (ongoing and completed)</li>
                      <li>Find the code to share with your students to join the classroom</li>
                    </ol></Typography>
                    <img src='opened-classroom.png' alt={steps[step]+" image"} width="400px" style={{border:'1px dotted #000000'}} />
                  </Grid>
                </Grid>
              : step == 4
              ? <Grid Container>
                  <Typography><ol>
                    <li>Give the quiz event a useful description</li>
                    <li>Choose the quiz to launch</li>
                    <li>Press Next to complete</li>
                  </ol></Typography>
                  <Grid Container display='grid' alignContent={'center'} justifyContent={'center'} width={'90%'}>
                    <img src='launch-quiz.png' alt={steps[step]+" image"} width='600px' style={{border:'1px dotted #000000'}} />
                  </Grid>
                </Grid>
              : <Grid Container>
                  <Typography>View the students' results by quiz<ol>
                    <li>Student name and the quiz they took part in</li>
                    <li>A summary of questions entered and the score achieved</li>
                    <li>Breakdown of answers with individual scores</li>
                    <li>Wrong answers show the correct response</li>
                  </ol></Typography>
                  <Grid Container display='grid' alignContent={'center'} justifyContent={'center'} width={'90%'}>
                    <img src='teacher-results.png' alt={steps[step]+" image"} width='600px' style={{border:'1px dotted #000000'}} />
                  </Grid>
                </Grid>
              }
          </Box>
      </Container>

      {/* navigation buttons */}
      <Container>
        <Grid Container columns={2} alignContent={'center'} justifyContent={'center'} display={'flex'} width={'90%'}>
          <Grid item paddingRight={'2em'} width={'50vw'}>
              <Button fullWidth size='large' variant='contained' color='success' onClick={()=>handlePreviousStep()} startIcon={step > 0 ? <NavigateBeforeIcon/> : ""}>
                  {step == 0 ? 'Start' : 'Back'}
              </Button>
          </Grid>
          <Grid item paddingLeft={'2em'} width={'50vw'}>
              <Button fullWidth size='large' variant='contained' color='success' onClick={()=>handleNextStep()} endIcon={step < LAST_STEP_IDX ? <NavigateNextIcon/> : ""}>
                  {step == LAST_STEP_IDX ? 'End' : 'Next'}
              </Button>
          </Grid>
        </Grid>
    </Container>                
  </div>
  )
}