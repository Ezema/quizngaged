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

export default function MyClassrooms(props) {
  
  const [addQuestion,setAddQuestion] = React.useState(true)

  const [topBarTitle,setTopBarTitle] = React.useState("My questions")

  const handleAddQuestion = ()=>{
    (!addQuestion)?(setAddQuestion(true),setTopBarTitle("Add new question")):null
  }
  const handleGoBackToMyQuestions = ()=>{
    (addQuestion)?(setAddQuestion(false),setTopBarTitle("My questions")):null
  }

  const userIsAuthenticated = props.userIsAuthenticated;

  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = (openStatus) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setSidebarOpen(openStatus);
  };

  //this is hardcoded but will be fetched when the API is operative. When the API is defined, the subtitle will contain either a brief description or some piece of stat about the classroom like students joined
  const listOfQuestions = [{id:"1",question:"Mathematics 6th grade"},{id:"2",question:"Mathematics 6th grade"},{id:"3",question:"Mathematics 6th grade"},{id:"4",question:"Mathematics 6th grade"},{id:"5",question:"Mathematics 6th grade"},{id:"6",question:"Mathematics 6th grade"},{id:"7",question:"Mathematics 6th grade"},{id:"8",question:"Mathematics 6th grade"},{id:"9",question:"Mathematics 6th grade"}];

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
        {addQuestion?(
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
        ):(
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
        {addQuestion?(
          <Box paddingTop="1em" paddingBottom="100px">
            <AddQuestion setAddQuestion={setAddQuestion} ></AddQuestion>
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
                      {question.question}
                    </Typography>
                    <Button size="small">EDIT</Button>
                  </CustomPaperReactComponent>
                </Grid>      
              )
            }
          </Grid>
        </Box>)}
      </Container>
      {addQuestion?
      (<div></div>)
      :(
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
          <Toolbar>          
            <StyledFab color="secondary" aria-label="add" onClick={(e)=>handleAddQuestion()}>
              <AddIcon />
            </StyledFab>          
          </Toolbar>
        </AppBar>
      )
      }
    </div>
  );
}

