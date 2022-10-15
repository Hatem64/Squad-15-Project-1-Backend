import mongoose from "mongoose";
//import Apprentice from "./Apprenticeship";
const {Schema , SchemaTypes, model} = mongoose;
const adminSchema = new Schema({
    user_name: String,
    password: String,
    e_mail:String,
    apprentice: [{type : SchemaTypes.ObjectId , ref: 'Apprentice'}]
});

const Admin = model("Admin",adminSchema);
export default Admin;