import * as React from 'react';
import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

export default function ValidatingSnackBar(props) {

  const [snackBar, setSnackBar] = React.useState({isOpen: !props.isValid, message: props.message, severity: 'error'})

  const closeSnackBar = () => {
    setSnackBar({isOpen:false, message:"", severity:""})
  }

  return (
    <div>
      props.isValid = {props.isValid.toString()} snackBar.isOpen = {snackBar.isOpen.toString()}
    <Snackbar
      open={snackBar.isOpen}
      autoHideDuration={6000}
      onClose={closeSnackBar}
      >
      <Alert severity='error'>{props.message}</Alert>
    </Snackbar></div>
  )
}
