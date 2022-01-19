import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const CustomPaperReactComponent = styled(Paper)(({ theme }) => ({    
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));  

export default CustomPaperReactComponent;