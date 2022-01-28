import * as React from 'react';

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

//import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import Router from 'next/router'

export default function CustomTopNavBar(props){

    const list = () => (
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
              firebase.auth().signOut().then(function() {Router.push('/')
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

        firebase.auth().signOut().then(function() {Router.push('/')          
        }, function(error) {
        });
    };

    const handleGoBackToMyQuestions = ()=>{
      if(props.addQuestionState){
        (props.setAddQuestionState(false),props.setTopBarTitle("My questions"))
      }else if(props.editQuestionState){
        (props.setEditQuestionState(false),props.setTopBarTitle("My questions"))
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
                    onClick={(props.editQuestionState || props.addQuestionState)?handleGoBackToMyQuestions:toggleSidebar(true)}
                >
                  {props.goBackIconState?(<ArrowBackIcon />):(<MenuIcon />)}
                    
                </IconButton>    
                    
                <Drawer
                    anchor={'left'}
                    open={sidebarOpen}
                    onClose={toggleSidebar(false)}
                >
                    {list()}
                </Drawer>
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