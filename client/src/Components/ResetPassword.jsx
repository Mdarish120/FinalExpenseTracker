import React,{useState} from 'react';
import { Button, Container, Paper, TextField, Typography } from '@mui/material'
import { useParams } from 'react-router-dom';
import useStyles from './styles';
import axios from 'axios';


const ResetPassword = () => {

    const { resetToken } = useParams();
    const classes = useStyles();
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");

    const handleSubmit= async(e)=>{

        e.preventDefault();
        if(confirmPassword !== password){
            alert("password is not equal");
        };
        const res=await axios.post(`http://localhost:5000/auth/reset-password/${resetToken}`,{password});
        console.log(res);


     }
  


  return (
    <Container component="main" maxWidth="xs">
    <Paper className={classes.paper} elevation={6}>
        <Typography  component="h1" variant="h5" sx={{mb:6}}>Reset Password</Typography>
        <form  onSubmit={handleSubmit}>
        <TextField name="password" label="Password" onChange={(e)=>setPassword(e.target.value)} value={password}  type="password" fullWidth  sx={{mb:2}}/>
        <TextField name="confirmPassword" label="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword}  type="password" fullWidth />
    <Button variant='contained' sx={{mt:4}} type='submit'>Send</Button>
        </form>

    </Paper>
  
   </Container>
  )
}

export default ResetPassword