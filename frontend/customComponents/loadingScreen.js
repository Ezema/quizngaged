/* mui libraries */
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function LoadingScreen(){
    return(
        <div>
            <Box style={{width:'100%',minWidth:'100vw', minHeight:'100vh', display:'flex',justifyContent:'center',alignItems:'center'}}>
                <CircularProgress></CircularProgress>
            </Box>
        </div>
    )
}