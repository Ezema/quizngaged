import * as React from 'react';
import Link from 'next/link'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import ListIcon from '@mui/icons-material/List';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import CustomPaperReactComponent from '../customComponents/customPaperReactComponent.js';
import StyledFab from '../customComponents/styledFab.js';
import AddQuestion from '../customComponents/addQuestion.js'
import EditQuestion from '../customComponents/editQuestion.js'


//this is hardcoded but will be fetched when the API is operative. When the API is defined, the subtitle will contain either a brief description or some piece of stat about the classroom like students joined  
const listOfQuestionsRetrieved = [{id:"1",questionType:'Multiple Choice',baselineQuestion:"Mathematics 6th grade",baselineQuestionAnswers:[{id:1,parentQuestionId:'1',body:'Physics'},{id:2,parentQuestionId:'1',body:'Maths'},{id:3,parentQuestionId:'1',body:'Arts'},{id:4,parentQuestionId:'1',body:'Literature'}],easierQuestion:"Mathematics 6th grade",easierQuestionAnswers:[{id:1,parentQuestionId:'1',body:'Physics'},{id:2,parentQuestionId:'1',body:'Maths'},{id:3,parentQuestionId:'1',body:'Arts'},{id:4,parentQuestionId:'1',body:'Literature'}],harderQuestion:"Mathematics 6th grade",harderQuestionAnswers:[{id:1,parentQuestionId:'1',body:'Physics'},{id:2,parentQuestionId:'1',body:'Maths'},{id:3,parentQuestionId:'1',body:'Arts'},{id:4,parentQuestionId:'1',body:'Literature'}]},{id:"2",questionType:'Text Response',baselineQuestion:"Mathematics 6th grade",baselineQuestionAnswers:[{id:1,parentQuestionId:'1',body:'Physics'},{id:2,parentQuestionId:'1',body:'Maths'},{id:3,parentQuestionId:'1',body:'Arts'},{id:4,parentQuestionId:'1',body:'Literature'}],easierQuestion:"Mathematics 6th grade",easierQuestionAnswers:[{id:1,parentQuestionId:'1',body:'Physics'},{id:2,parentQuestionId:'1',body:'Maths'},{id:3,parentQuestionId:'1',body:'Arts'},{id:4,parentQuestionId:'1',body:'Literature'}],harderQuestion:"Mathematics 6th grade",harderQuestionAnswers:[{id:1,parentQuestionId:'1',body:'Physics'},{id:2,parentQuestionId:'1',body:'Maths'},{id:3,parentQuestionId:'1',body:'Arts'},{id:4,parentQuestionId:'1',body:'Literature'}]}];

export default function MyClassrooms(props) { 

  const [listOfQuestions,setListOfQuestions] = React.useState(listOfQuestionsRetrieved)

  const [newQuestionUID,setNewQuestionUID] = React.useState(null)
  
  const [addQuestionState,setAddQuestionState] = React.useState(false)
  
  const [editQuestionState,setEditQuestionState] = React.useState(false)

  const [questionUIDToEdit,setQuestionUIDToEdit] = React.useState(null)
  const [questionToEdit,setQuestionToEdit] = React.useState(null) 

  const [questionIndexInQuestionsArray,setQuestionIndexInQuestionsArray]= React.useState(null) 
  

  const [topBarTitle,setTopBarTitle] = React.useState("My questions")

  const handleAddQuestionState = ()=>{    
    if(!addQuestionState){
      let copyOfStatefulArray = JSON.parse(JSON.stringify(listOfQuestions));      
      setNewQuestionUID(parseInt(copyOfStatefulArray[copyOfStatefulArray.length-1].id) + 1 )    
      setAddQuestionState(true);
      setTopBarTitle("Add new question")
    }
    else{
      null
    }
    
    
  }
  const handleGoBackToMyQuestions = ()=>{
    if(addQuestionState){
      (setAddQuestionState(false),setTopBarTitle("My questions"))
    }else if(editQuestionState){
      (setEditQuestionState(false),setTopBarTitle("My questions"))
    }
    
  }

  const userIsAuthenticated = props.userIsAuthenticated;

  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = (openStatus) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setSidebarOpen(openStatus);
  };

  const handleEditQuestionState = (event,questionindexInArray)=>{    
    setEditQuestionState(true)
    setQuestionUIDToEdit(listOfQuestions[questionindexInArray].id)        
    setQuestionIndexInQuestionsArray(questionindexInArray)
    
    setQuestionToEdit(listOfQuestions[questionindexInArray])
  }

  

  const list = () => (
    <Box
      role="presentation"
      onClick={toggleSidebar(false)}
      onKeyDown={toggleSidebar(false)}
    >
      <List>        
        <Link href="/my-classrooms" passHref>
          <a>
            <ListItem button>
              <ListItemIcon>
                <LocalLibraryIcon />
              </ListItemIcon>
              <ListItemText>
                My Classrooms
              </ListItemText>
            </ListItem>
          </a>
        </Link>
        <Link href="/my-quizzes" passHref>
          <a>
            <ListItem button>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText>
                My quizzes
              </ListItemText>        
            </ListItem>        
          </a>
        </Link>
        <Link href="/my-questions" passHref>
          <a>
            <ListItem button selected>
              <ListItemIcon>
                <QuestionAnswerIcon />
              </ListItemIcon>          
              <ListItemText>
                My questions
              </ListItemText>            
            </ListItem>
          </a>
        </Link>
      </List>
      <Divider />
      <List>        
        <ListItem button>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <Link href="/my-account" passHref>
            <a>
              <ListItemText>
                My account
              </ListItemText>
            </a>
          </Link>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>
            Log out
          </ListItemText>
        </ListItem>        
      </List>
    </Box>
  );

  return (        
    <div>
      <AppBar position="sticky">
        <Toolbar>
        {(addQuestionState)?(
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="back"
            sx={{ mr: 2 }}
            onClick={()=>handleGoBackToMyQuestions()}
          >
            <ArrowBackIcon/>
          </IconButton>  
        ):(editQuestionState)?(
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="back"
            sx={{ mr: 2 }}
            onClick={()=>handleGoBackToMyQuestions()}
          >
            <ArrowBackIcon/>
          </IconButton>  
        )        
        :(
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleSidebar(true)}
          >
            <MenuIcon />
          </IconButton>  
        )}  
            
          <Drawer
            anchor={'left'}
            open={sidebarOpen}
            onClose={toggleSidebar(false)}
          >
            {list()}
          </Drawer>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {topBarTitle}
          </Typography>

            {userIsAuthenticated && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={()=>{}}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={()=>{}}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(()=>{})}
                  onClose={()=>{}}
                >
                  <MenuItem onClick={()=>{}}>Profile</MenuItem>
                  <MenuItem onClick={()=>{}}>My account</MenuItem>
                </Menu>
              </div>
            )}
        </Toolbar>
      </AppBar>
      <Container>
        {addQuestionState?(
          <Box paddingTop="1em" paddingBottom="100px">
            <AddQuestion listOfQuestions={listOfQuestions} setListOfQuestions={setListOfQuestions} newQuestionUID={newQuestionUID} setAddQuestionState={setAddQuestionState}  ></AddQuestion>
          </Box>
        )
        :
        (editQuestionState)?        
        (
          <Box paddingTop="1em" paddingBottom="100px">
            <EditQuestion listOfQuestions={listOfQuestions} setListOfQuestions={setListOfQuestions} QuestionIndexInQuestionsArray={questionIndexInQuestionsArray} QuestionUIDToEdit={questionUIDToEdit} setEditQuestionState={setEditQuestionState} questionToEdit={questionToEdit}>

            </EditQuestion>
          </Box>
        )
        :
        (<Box paddingTop="1em" paddingBottom="100px">
          <Grid container spacing={2}>
            {
              listOfQuestions.map((question)=>                 
                <Grid item xs={12} md={6} lg={4} key={question.id}>              
                  <CustomPaperReactComponent elevation={3}>                  
                    <Typography variant='h6'>
                        #{question.id}
                      </Typography>
                    <Typography variant='subtitle1'>                    
                      {question.baselineQuestion}
                    </Typography>
                    <Button size="small" onClick={(event)=>handleEditQuestionState(event,listOfQuestions.indexOf(question))}>EDIT</Button>
                  </CustomPaperReactComponent>
                </Grid>      
              )
            }
          </Grid>
        </Box>)}
      </Container>
      {addQuestionState?
      (<div></div>)
      :(editQuestionState)?
      (<div></div>)
      :(
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
          <Toolbar>          
            <StyledFab color="secondary" aria-label="add" onClick={(e)=>handleAddQuestionState()}>
              <AddIcon />
            </StyledFab>          
          </Toolbar>
        </AppBar>
      )
      }
    </div>
  );
}

