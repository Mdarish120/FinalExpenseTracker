import React, { useState } from 'react';
import {AppBar,Box,Toolbar,Typography,Button,IconButton,Avatar,Stack} from '@mui/material';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import {  toast } from 'react-toastify';
import axios from "axios";

import { useNavigate } from 'react-router-dom';
const Navbar = () => {

  
    const navigate=useNavigate();


    const handleReport= async()=>{

      if(!localStorage.getItem("isValid")){
        toast("Please buy premium first....")
      }else{
        navigate("/report");
      }
     
    }


    const handleLeaderboard= async()=>{

      if(!localStorage.getItem("isValid")){
        toast("Please buy premium first....")
      }else{
        navigate("/leaderboard");
      }
     
    }

    const handleSubmit = async () => {
      
     
 
  
      try {
     const response = await axios.post('http://localhost:5000/expense/payment',{name:"Premium",desc:"Buy Description...",amount:500} );
       const res = response.data;
        console.log(response);
  
        if (res.success) {
          const options = {
            key: `${res.key_id}`,
            amount: `${res.amount}`,
            currency: 'INR',
            name: `${res.product_name}`,
            description: `${res.description}`,
            image: 'https://dummyimage.com/600x400/000/fff',
            order_id: `${res.order_id}`,
            handler: function (response) {
              toast("Successfully....");
             localStorage.setItem("isValid","yes");
              // window.open("/", "_self");
            },
            prefill: {
              contact: `${res.contact}`,
              name: `${res.name}`,
              email: `${res.email}`,
            },
            notes: {
              description: `${res.description}`,
            },
            theme: {
              color: '#2300a3',
            },
          };
          const razorpayObject = new window.Razorpay(options);
          razorpayObject.on('payment.failed', function (response) {
            toast("Failed...");
          });
          razorpayObject.open();
        } else {
          toast("Payment Successfully....");
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };









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
          <Button style={{color:"white"}} endIcon={<StarHalfIcon />} onClick={handleReport}>Report</Button>
          <Button style={{color:"white"}} endIcon={<StarHalfIcon />} onClick={handleLeaderboard}>Leaderboad</Button>
        </Stack>
    
      </Box>
         
          <Box sx={{mr:5}}>
            <Stack direction="row" spacing={2}>
            <Button style={{color:"white"}} endIcon={<StarHalfIcon/>} onClick={handleSubmit}>Buy Perimium</Button>
            <Button color="inherit" onClick={()=>navigate("/form")} >Login</Button>
          
            </Stack>
       
        
          </Box>
   
        </Toolbar>
      </AppBar>
  
 </>
  )
}

export default Navbar