import React,{useState} from "react";
import {BrowserRouter,Route,Routes,Navigate} from "react-router-dom";
import Form from "./Components/Form";
import AddExpenses from "./Components/AddExpenses";
import ForgetPassword from "./Components/ForgetPassword";
import ResetPassword from "./Components/ResetPassword";
import Navbar from "./Components/Navbar";



const App = () => {


  return (
    <BrowserRouter>
   <Navbar/>
    <Routes>
        <Route path="/form" element={<Form/>} />
        <Route path="/" element={<AddExpenses/>} />
        <Route path="/forget-password" element={<ForgetPassword/>} />
       <Route path="/reset-password/:resetToken" element={<ResetPassword/>}/>  

      </Routes>
    </BrowserRouter>
  )
}

export default App