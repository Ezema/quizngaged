import * as React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image'
import StepsToCreateAccount from './stepsToCreateAccount';
import Router from 'next/router'


export default function CreateQuizngagedAccount(props){        

    const [createAccount,setCreateAccount] = React.useState(0)
    const [userProfile,setUserProfile] = React.useState(null)    

    function handleCreateTeacherAccount (){        
        setUserProfile('Teacher')
        setCreateAccount(1)
    }
    function handleCreateStudentAccount(){        
        setUserProfile('Student')
        setCreateAccount(1)
    }

    /* React.useEffect(()=>{
        
    }) */
    
    return(
        (createAccount==0)?(            
            <div style={{
                textAlign: 'center',
                overflowY: 'hidden',
                overflowX: 'hidden',
                backgroundColor: '#2196f3',
                minHeight: '100vh',
                maxHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'  
            }}>                
                <Container maxWidth='sm' display='grid' align="center" justify="center" style={{padding:'2em'}}>
                    <Paper style={{paddingBottom:'1em'}}>
                        <Grid Container display='grid' align="center" justify="center" style={{padding:'1em'}} >                   
                            <Grid item padding={'3em'}>
                                <Button variant='contained' size='large' color='primary' fullWidth onClick={handleCreateTeacherAccount}>
                                    Create Teacher acccount
                                </Button>
                            </Grid> 
                            <Grid item padding={'3em'}>
                                <Button variant='contained' size='large' color='secondary' fullWidth onClick={handleCreateStudentAccount}>
                                    Create student acccount
                                </Button>
                            </Grid>
                        </Grid>                 
                    </Paper>        
                </Container>
            </div>
        ):
            <StepsToCreateAccount userProfile={userProfile}></StepsToCreateAccount>
        )
}