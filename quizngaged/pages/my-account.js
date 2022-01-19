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

import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Skeleton from '@mui/material/Skeleton'

import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import ListIcon from '@mui/icons-material/List';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { Container } from '@mui/material';

export default function MyClassrooms(props) {
  

  const userIsAuthenticated = props.userIsAuthenticated;

  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = (openStatus) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setSidebarOpen(openStatus);
  };

  const list = () => (
    <Box
      role="presentation"
      onClick={toggleSidebar(false)}
      onKeyDown={toggleSidebar(false)}
    >
      <List>        
        <ListItem button>
          <ListItemIcon>
            <LocalLibraryIcon />
          </ListItemIcon>
          <Link href="/my-classrooms" passHref>
            <a>
              <ListItemText>
                My Classrooms
              </ListItemText>
            </a>
          </Link>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <Link href="/my-quizzes" passHref>
            <a>
              <ListItemText>
                My quizzes
              </ListItemText>
            </a>
          </Link>
        </ListItem>        
        <ListItem button>
          <ListItemIcon>
            <QuestionAnswerIcon />
          </ListItemIcon>
          <Link href="/my-questions" passHref>
            <a>
            <ListItemText>
              My questions
            </ListItemText>
            </a>
          </Link>
        </ListItem>
      </List>
      <Divider />
      <List>        
        <ListItem button selected>
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
    <AppBar position="static">
      <Toolbar>
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
          
        <Drawer
          anchor={'left'}
          open={sidebarOpen}
          onClose={toggleSidebar(false)}
        >
          {list()}
        </Drawer>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Account
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
      <Skeleton marginTop='2em' animation="wave" variant='h1'/>
      <Skeleton marginTop='2em' animation="wave" variant='h1'/>
      <Skeleton marginTop='2em' animation="wave" variant='h1'/>
      <Skeleton marginTop='2em' animation="wave" variant='h1'/>
      <Skeleton marginTop='2em' animation="wave" variant='h1'/>
    </Container>
    </div>
  );
}

