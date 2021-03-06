import * as React from 'react';

/* customComponents */
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Link from 'next/link'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import ListIcon from '@mui/icons-material/List';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

/* firebase, next */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Router from 'next/router'

export default function CustomTopNavBar(props){

    const teacherList = () => (
        <Box
          role="presentation"
          onClick={toggleSidebar(false)}
          onKeyDown={toggleSidebar(false)}
        >
          <List>        
            <Link href="/my-classrooms" passHref>
              <a>
                <ListItem button selected={props.topBarTitle.localeCompare('My Classrooms')==0}>
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
                <ListItem button selected={props.topBarTitle.localeCompare('My Quizzes')==0}>
                  <ListItemIcon>
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText>
                    My Quizzes
                  </ListItemText>        
                </ListItem>        
              </a>
            </Link>
            <Link href="/my-questions" passHref>
              <a>
                <ListItem button selected={props.topBarTitle.localeCompare('My Questions')==0}>
                  <ListItemIcon>
                    <QuestionAnswerIcon />
                  </ListItemIcon>          
                  <ListItemText>
                    My Questions
                  </ListItemText>            
                </ListItem>
              </a>
            </Link>
          </List>
          <Divider />
          <List>        
            <Link href="/my-account" passHref>
              <a>
                <ListItem button selected={props.topBarTitle.localeCompare('My Account')==0}>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>              
                  <ListItemText>
                    My Account
                  </ListItemText>
                
                </ListItem>
              </a>
            </Link>
            <ListItem button onClick={()=>{

              // Configure Firebase SDK client key.
              const firebaseConfig = {
                apiKey: "AIzaSyAI7fRp-LbEWGJr5o0VphYXxdRK57rKXBI",
                authDomain: "quizngaged-login.firebaseapp.com",
                projectId: "quizngaged-login",
                storageBucket: "quizngaged-login.appspot.com",
                messagingSenderId: "437791237122",
                appId: "1:437791237122:web:3361b862fb8739c968731b",
                measurementId: "G-W6MC0DXLRL"
              };

              //check if firebase is already initialized
              if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
              }else {
                firebase.app(); // if already initialized, use that one  
              }
                            
              firebase.auth().signOut().then(function() {                
                Router.push('/')
                localStorage.clear();
              }, function(error) {
              });
              
            }}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>              
                <ListItemText>
                  Log Out
                </ListItemText>              
            </ListItem>        
          </List>
        </Box>
      );

    const studentList = () => (
      <Box
        role="presentation"
        onClick={toggleSidebar(false)}
        onKeyDown={toggleSidebar(false)}
      >
        <List>        
          <Link href="/my-classrooms" passHref>
            <a>
              <ListItem button selected={props.topBarTitle.localeCompare('My Classrooms')==0}>
                <ListItemIcon>
                  <LocalLibraryIcon />
                </ListItemIcon>
                <ListItemText>
                  My Classrooms
                </ListItemText>
              </ListItem>
            </a>
          </Link>          
        </List>
        <Divider />
        <List>        
          <Link href="/my-account" passHref>
            <a>
              <ListItem button selected={props.topBarTitle.localeCompare('My Account')==0}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>              
                <ListItemText>
                  My Account
                </ListItemText>
              
              </ListItem>
            </a>
          </Link>
          <ListItem button onClick={()=>{

            // Configure Firebase SDK client key.
            const firebaseConfig = {
              apiKey: "AIzaSyAI7fRp-LbEWGJr5o0VphYXxdRK57rKXBI",
              authDomain: "quizngaged-login.firebaseapp.com",
              projectId: "quizngaged-login",
              storageBucket: "quizngaged-login.appspot.com",
              messagingSenderId: "437791237122",
              appId: "1:437791237122:web:3361b862fb8739c968731b",
              measurementId: "G-W6MC0DXLRL"
            };

            //check if firebase is already initialized
            if (!firebase.apps.length) {
              firebase.initializeApp(firebaseConfig);
            }else {
              firebase.app(); // if already initialized, use that one  
            }
                          
            firebase.auth().signOut().then(function() {                
              Router.push('/')
              localStorage.clear();
            }, function(error) {
            });
            
          }}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>              
              <ListItemText>
                Log Out
              </ListItemText>              
          </ListItem>        
        </List>
      </Box>
    );

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    const toggleSidebar = (openStatus) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setSidebarOpen(openStatus);
    };

    const handleToggleUserIcon = (event)=>{
        setAnchorEl(event.currentTarget);
    }

    const handlePageRedirection = () => {
        Router.push('/my-account')
    }

    const handleLogOut = () => {
        setAnchorEl(null);
        
        // Configure Firebase SDK client key.
        const firebaseConfig = {
          apiKey: "AIzaSyAI7fRp-LbEWGJr5o0VphYXxdRK57rKXBI",
          authDomain: "quizngaged-login.firebaseapp.com",
          projectId: "quizngaged-login",
          storageBucket: "quizngaged-login.appspot.com",
          messagingSenderId: "437791237122",
          appId: "1:437791237122:web:3361b862fb8739c968731b",
          measurementId: "G-W6MC0DXLRL"
        };

        //check if firebase is already initialized
        if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
        }else {
          firebase.app(); // if already initialized, use that one  
        }
                      
        firebase.auth().signOut().then(function() {                
          Router.push('/')
          localStorage.clear();
        }, function(error) {
        });                
        
    };

    const handleGoBackToPreviousScreen = ()=>{
      if(props.addQuestionState){
        (props.setAddQuestionState(false),props.setTopBarTitle("My questions"))
      }else if(props.editQuestionState){
        (props.setEditQuestionState(false),props.setTopBarTitle("My questions"))
      }else if(props.editQuizState) {
        (props.setEditQuizState(false), props.setTopBarTitle("My quizzes"))
      }else if(props.addQuizState) {
        (props.setAddQuizState(false), props.setTopBarTitle("My quizzes"))
      }else if(props.addClassroomState) {
        (props.setAddClassroomState(false), props.setTopBarTitle("My Classrooms"))
      }else if(props.editClassroomState) {
        (props.setEditClassroomState(false), props.setTopBarTitle("My Classrooms"))
      }else if(props.viewClassroomStatisticsState) {
        (props.setViewClassroomStatisticsState(false), props.setTopBarTitle("Classroom"))
      }else if(props.viewClassroomResultsState) {
        (props.setViewClassroomResultsState(false), props.setTopBarTitle("Classroom"))
      }else if(props.launchClassroomQuizState) {
        (props.setLaunchClassroomQuizState(false), props.setTopBarTitle("Classroom"))
      }else if(props.viewClassroomOngoingQuizzesState) {
        (props.setViewClassroomOngoingQuizzesState(false), props.setTopBarTitle("Classroom"))
      }else if(props.viewClassroomState) {
        (props.setViewClassroomState(false), props.setTopBarTitle("My Classrooms"))
      }      
      
    }

    return(
        <AppBar position="sticky">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={(props.editQuestionState || props.addQuestionState || props.editQuizState || props.addQuizState || props.addClassroomState || props.editClassroomState || props.viewClassroomState || props.viewClassroomStatisticsState || props.viewClassroomResultsState || props.launchClassroomQuizState || props.viewClassroomOngoingQuizzesState)?handleGoBackToPreviousScreen:toggleSidebar(true)}
                >
                  {props.goBackIconState?(<ArrowBackIcon />):(<MenuIcon />)}
                    
                </IconButton>    
                    
                {
                  (JSON.parse(localStorage.quizngagedUserData).userType.localeCompare('Teacher')==0)?
                  (
                    <Drawer
                        anchor={'left'}
                        open={sidebarOpen}
                        onClose={toggleSidebar(false)}>
                          {teacherList()}
                    </Drawer>
                  )
                  :
                  (
                    <Drawer
                        anchor={'left'}
                        open={sidebarOpen}
                        onClose={toggleSidebar(false)}>
                          {studentList()}
                    </Drawer>
                  )
                }
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  {props.topBarTitle}
                </Typography>
                                
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleToggleUserIcon}
                    color="inherit"
                >
                    {                                 
                    props.statefulUserObject?props.statefulUserObject.uid?(<Avatar alt="User" src={props.statefulUserObject.photoURL}>{props.statefulUserObject.displayName?props.statefulUserObject.displayName[0]:"User"}</Avatar>):null:<AccountCircle/>
                    }
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    open={open}
                    onClose={()=>setAnchorEl(null)}
                >              
                    <MenuItem onClick={handlePageRedirection}>My account</MenuItem>
                    <MenuItem onClick={handleLogOut}>Log out</MenuItem>
                </Menu>                
                
            </Toolbar>
        </AppBar>
    )
}