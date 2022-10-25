import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import crypto from "crypto";
//import Apprentice from "./Apprenticeship";
const { Schema, SchemaTypes, model } = mongoose;
const userSchema = new Schema({
  user_name: String,
  password: String,
  e_mail: String,
  apprentice: [{ type: SchemaTypes.ObjectId, ref: "Apprentice" }],
});
userSchema.methods.correctPassword = async function(candidatePassword,userPassword)
{
    return await bcrypt.compare(candidatePassword,userPassword)
}
userSchema.pre('save',async function (next){
  if(!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password,12);
  next();
});

const User = model("User", userSchema);
export default User;
