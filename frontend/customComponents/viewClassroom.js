import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';


import BoltIcon from '@mui/icons-material/Bolt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BarChartIcon from '@mui/icons-material/BarChart';

export default function ViewClassroom(props){
    return(
        <div>
            <Container>
            <Grid Container display={'grid'}>
                <Grid item marginBottom={'1em'}>
                    <Paper elevation={3}>
                        <Grid Container display={'flex'} /* justifyContent={'center'}  */alignContent={'center'} alignItems={'center'}>
                            <Grid item textAlign={'center'} sx={{background:'#1976d2',padding:'1em'}}>
                                <BoltIcon sx={{ fontSize: 100, color:'white'}}/>
                            </Grid>
                            <Grid item right={'0.1em'}>
                                <Button>
                                    Launch quiz
                                </Button>
                            </Grid>                            
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item marginBottom={'1em'} /* minHeight={'30vh'} */>
                    <Paper elevation={3}>
                        <Grid Container display={'flex'} alignContent={'center'} alignItems={'center'} /* minHeight={'30vh'} */>
                            <Grid item textAlign={'center'} left={'0.1em'} sx={{background:'#1976d2',padding:'1em'}}>
                                <VisibilityIcon sx={{fontSize:100, color:'white'}}/>
                            </Grid>
                            <Grid item margin={'0.1em'} textAlign={'center'} >
                                   <Button>
                                    View results
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper elevation={3}>
                        <Grid Container display={'flex'} alignContent={'center'} alignItems={'center'}>
                            <Grid item textAlign={'center'} left={'0.1em'} sx={{background:'#1976d2',padding:'1em'}}>
                                <BarChartIcon sx={{fontSize:100, color:'white'}}/>
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