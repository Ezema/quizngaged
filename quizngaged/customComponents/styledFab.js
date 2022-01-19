import { Fab } from "@mui/material";
import { styled } from '@mui/material/styles';

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  });

export default StyledFab;