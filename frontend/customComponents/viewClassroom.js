import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import BoltIcon from '@mui/icons-material/Bolt';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function ViewClassroom(props){
    return(
        <div>
            <Container>
            <Grid Container display={'grid'}>
                <Grid item marginBottom={'1em'}>
                    <Paper elevation={3}>
                        <Grid Container display={'flex'} justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
                            <Grid item margin={'0.1em'} textAlign={'center'}>
                                <BoltIcon color="primary"/>
                            </Grid>
                            <Grid item margin={'0.1em'} textAlign={'center'}>
                                <Button>
                                    Launch quiz
                                </Button>
                            </Grid>
                            <Grid item margin={'0.1em'} textAlign={'center'}>
                                <BoltIcon color="primary"/>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item marginBottom={'1em'}>
                    <Paper elevation={3}>
                        <Grid Container display={'flex'} justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
                            <Grid item margin={'0.1em'} textAlign={'center'}>
                                <VisibilityIcon color="secondary"/>
                            </Grid>
                            <Grid item margin={'0.1em'} textAlign={'center'} >
                                   <Button>
                                    View statistics
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>                
            </Grid>
            </Container>
        </div>
    )
}