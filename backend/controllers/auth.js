import db from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";


const User=db.authTable;

const secret="awesome";

// Initialize a nodemailer transporter (configure your email service credentials)


  let transporter = nodemailer.createTransport({
 host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS:true,
    auth: {
      user: 'noreplyamazona@gmail.com',
      pass: 'arish9720428758',
    },
  });
export const signup= async(req,res)=>{
  
    const {name,email,password,confirmPassword}=req.body;
    try {   if(password !==confirmPassword) return res.status(400).json({message:"Something wrong..."})
          const olderUser=await User.findOne({where:{email}});
          if (olderUser) return res.status(400).json({message:"Useris alread exits"});
          const hashPassword=await bcrypt.hash(password,12);
          const createUser=await User.create(({email,password:hashPassword,name}));
          const token=jwt.sign({email:createUser.email,id:createUser.id},secret,{expiresIn:"1h"});
          res.status(201).json({result:createUser,token});

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    
        console.log(error);
    }

}


export const login= async(req,res)=>{
   const {email,password}=req.body;
    try {
        const olderUser=await User.findOne({where:{email:email}});
        if(!olderUser) return res.status(404).json({message:"User does'not exits"});

        const isPasswordCorrect=await bcrypt.compare(password,olderUser.password);

        if(!isPasswordCorrect) return res.status(400).json({message:"Invalid credentail"});

        const token=jwt.sign({email:olderUser.email,id:olderUser.id},secret,{expiresIn:"1hr"});

        res.status(200).json({result:olderUser,token});

        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }

}


export const forgetPassword = async(req,res)=>{
  const {email}=req.body;
  console.log(email);
    try {
          const user=await User.findOne({where:{email}});
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          
          const resetToken = crypto.randomBytes(20).toString('hex');
          const resetTokenExpires = new Date(Date.now() + 3600000); // Token valid for 1 hour
          await user.update({
            resetToken,
            resetTokenExpires,
          },
          {where:{email:user.email}}
          );

          const resetLink = `http://localhost:5000/auth/reset-password/${resetToken}`;
          await transporter.sendMail({
            from: "noreplyamazona@gmail.com",
            to: email,
            subject: 'Password Reset',
            text: `To reset your password, click on the following link: ${resetLink}`
          });

          res.status(200).json({ message: 'Password reset email sent. Check your inbox.' });
    } catch (error) {
        console.log(error);
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


export const resetPassword= async(req,res)=>{
  const { resetToken } = req.params;
  const {password:newPassword}=req.body;
  try {
   
    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Sequelize.Op.gte]: new Date() }, // Token should be valid
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
      await User.update(
        {password:hashedPassword,resetPasswordToken:null,resetPasswordExpires:null},
        {where:{email:user.email}}
      );

      res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
      console.log(error);
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
}