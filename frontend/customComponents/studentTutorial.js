import * as React from 'react';
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

// steps titles
const steps = [
  'Join Classroom',
  'Open Classroom',
  'Join Quiz',
  'Complete Questions',
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
                  <Typography paddingBottom='2em'>Afterwards, you will join a classroom, at the end of the tutorial, click the icon at the bottom of this page</Typography>
                  <Grid Container columns={2} display='flex'>
                    <Typography width={'30%'} paddingRight='1em'><ol>
                      <li>First you will enter the code your teacher gave you</li>
                      <li>You can add a title to the class if you like</li>
                      <li>Click Next to continue</li>
                    </ol></Typography>
                    <img src='join-classroom.png' alt={steps[step]+" image"} width="600px" style={{border:'1px dotted #000000'}} />
                  </Grid>
                </Grid>
              : step == 1
              ? <Grid Container>
                  <Typography>Open the classroom</Typography>
                  <Grid Container display='grid' alignContent={'center'} justifyContent={'center'} width={'90%'}>
                    <img src='open-classroom.png' alt={steps[step]+" image"} width='400px' style={{border:'1px dotted #000000'}} />
                  </Grid>
                </Grid>
              : step == 2
              ? <Grid Container>
                  <Grid Container columns={2} display='flex'>
                    <Typography width={'30%'}>From here you can<ol>
                      <li>Join any ongoing quizzes</li>
                      <li>View your results from quizzes (ongoing and completed)</li>
                    </ol></Typography>
                    <img src='student-opened-classroom.png' alt={steps[step]+" image"} width="300px" style={{border:'1px dotted #000000'}} />
                  </Grid>
                  <br />
                  <Typography paddingBottom='1em'>After you click to join a quiz, find the right one and click Join again</Typography>
                  <Grid Container display='grid' alignContent={'center'} justifyContent={'center'} width={'90%'}>
                    <img src='join-quiz.png' alt={steps[step]+" image"} width='400px' style={{border:'1px dotted #000000'}} />
                  </Grid>
                </Grid>
              : step == 3
              ? <Grid Container>
                  <Grid Container columns={2} display='flex'>
                    <Typography width={'30%'}><ol>
                      <li>Answer the question posed</li>
                      <li>By clicking on the correct option</li>
                      <li>If it's too difficult, there may be an easier question, or choose a harder one for more points</li>
                      <li>And submit your answer</li>
                    </ol></Typography>
                    <img src='submit-answer.png' alt={steps[step]+" image"} width='320px' style={{border:'1px dotted #000000'}} />
                  </Grid>
                </Grid>
              : <Grid Container>
                  <Typography paddingBottom='2em'>Your quiz results will be under the classroom menu</Typography>
                  <Grid Container display='grid' alignContent={'center'} justifyContent={'center'} width={'90%'}>
                    <img src='student-results.png' alt={steps[step]+" image"} width='600px' style={{border:'1px dotted #000000'}} />
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