import React from 'react';
import {AppBar,Box,Toolbar,Typography,Button,IconButton,Avatar,Stack} from '@mui/material';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import StarHalfIcon from '@mui/icons-material/StarHalf';

import { useNavigate } from 'react-router-dom';
const Navbar = () => {

    const navigate=useNavigate();
  return (
 <>
  
      <AppBar position="static" color='primary'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
         <CurrencyExchangeIcon/>
          </IconButton>

      <Box  sx={{ flexGrow: 1 }}>
        <Stack direction="row" spacing={2}>
        <Typography variant="h6" component="div">
            Exprense Tracker
          </Typography>
          <Button  style={{color:"white"}} variant='outlined' >Home</Button>
          <Button style={{color:"white"}} endIcon={<StarHalfIcon />}>Report</Button>
          <Button style={{color:"white"}} endIcon={<StarHalfIcon />}>Leaderboad</Button>
        </Stack>
    
      </Box>
         
          <Box sx={{mr:5}}>
            <Stack direction="row" spacing={2}>
            <Button style={{color:"white"}} endIcon={<StarHalfIcon/>} >Buy Perimium</Button>
            <Button color="inherit" onClick={()=>navigate("/form")} >Login</Button>
          
            </Stack>
       
        
          </Box>
   
        </Toolbar>
      </AppBar>
  
 </>
  )
}

export default Navbar