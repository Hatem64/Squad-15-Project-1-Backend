import { response } from 'express';
import User from '../model/User.js'
import fail from "../utils/apiUtils.js"

export const signup = async(req,res,next) => {
    try {
        const {username,email,password} = req.body;
        const newUser = await User.create({
            username,
            email,
            password
        })
      
        if(!newUser) throw new Error('Couldn\'t create user');
        await newUser.save();
           //return  CreateAndSendEmailVerification(newUser,req,res);
           //res.send(newUser);

    } catch (error) {
        req.send("error here");
       //res.status(500).json(fail(error.message));
    }
}

export const login = async(req, res, next) => {
    // GET EMAIL AND PASSWORD FROM REQUEST
    const {email,password} = req.body;
    //res.send(email);
    try {
        // CHECK EMAIL AND PASSWORD EXISTS
        if(!email || !password) {
            throw new Error("Please provide email and password")
        }
        // FIND USER BY EMAIL
        const user = await User.findOne({email})
        // .select('+password')
        if(!user) throw new Error("No such user")
      // else{ res.send("user logged in" + email)} 
        // CHECK IF ACCOUNT IS VERIFIED
    //     // if(!user.verified){
    //     //     return CreateAndSendEmailVerification(user,req,res);
    //     // }

    //     // if(!user || ! (await user.correctPassword(password,user.password))) {
    //     //     throw new Error("Invalid email or password")

    //     // }
    //     // // CREATE AND SEND NEW JWT TOKEN
    //     // createSendToken(user,200,res,req);

    } catch (error) {
        res.status(400).json(fail(error.message));
    }
}

//export default {login, signup};
//export default signup;
