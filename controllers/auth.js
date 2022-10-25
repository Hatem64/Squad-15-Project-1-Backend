import { response } from 'express';
import User from '../model/User.js'
import {fail, success} from "../utils/apiUtils.js"
import jwt from 'jsonwebtoken'
import crypto from "crypto"
import {promisify} from "util"

//const secret = process.env.JWT_SECRET || 'test';

const signToken = (id)=>{
    /**
     * Create jwt token
     */
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    })
  

}

const createSendToken = (user,statusCode,res,req)=>{
    /**
     * create token
     * create cookie 
     * send  response to user 
     */
    const token = signToken(user._id);
    const cookieOptions = {
        expires:new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000),
        httpOnly:true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
        sameSite:"None",
    };
    res.cookie('jwt',token,cookieOptions);
    user.password = undefined;

    res.status(statusCode).json({
        ...success(user),
        token
    })
}

export const signup = async(req,res,next) => {
    try {
        const {username,e_mail,password} = req.body;
        const existingUser = await User.findOne({e_mail});
        if(existingUser){
            throw new Error('user already registered');
        }
       
        const newUser = await User.create({
            username,
            e_mail,
            password
        })
    
      
        if(!newUser) throw new Error('Couldn\'t create user');
     
        await newUser.save();
           res.send("user successfully registered");

    } catch (error) {
        //res.send("error here");
       res.status(500).json(fail(error.message));
    }
}

export const login = async(req, res, next) => {
    // GET EMAIL AND PASSWORD FROM REQUEST
    const {e_mail,password} = req.body;
    //res.send(email);
    try {
        // CHECK EMAIL AND PASSWORD EXISTS
        if(!e_mail || !password) {
            throw new Error("Please provide email and password")
        }
        // FIND USER BY EMAIL
        const user = await User.findOne({e_mail}).select('+password')

        if(!user) throw new Error("No such user")
          if(!user || ! (await user.correctPassword(password,user.password))) {
      throw new Error("Invalid email or password")}
    //res.send("user successfully logged in")

    // CREATE AND SEND NEW JWT TOKEN
     createSendToken(user,200,res,req);

    } catch (error) {
        res.status(400).json(fail(error.message));
    }
}

//export default {login, signup};
//export default signup;
