import mongoose from "mongoose";
import Apprentice from './model/Apprenticeship.js';
import Admin from './model/Admin.js';
mongoose.connect("mongodb+srv://YoussefSalahaldin:01061408227Ys@cluster0.fxutt4q.mongodb.net/?retryWrites=true&w=majority");

const solve=  Apprentice.create({
    title: "",
    company_description:"",
    apprenticeship_description:"",
    team_type: "",
    team_role: [{
        role: "Android Developer",
        describtion: "",
        required_skills:[],
        complimentary_skills: [],
        minimum_hours: 12,
        location: [""],
    }],
    team_admin:[{
        name: "",
        e_mail: "",
        linkedin: "",
    }],
    time_line: {
        start_date:'2005-02-20',
        end_date: '2006-02-24'
    }
})
const admin = Admin.create({
    user_name: "samson",
    password: "01000",
    e_mail: "",
    apprentice: [solve.__id]
})



const firstArticle=  Apprentice.findOne({});
console.log(firstArticle);
