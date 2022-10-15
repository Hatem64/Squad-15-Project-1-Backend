import mongoose from "mongoose";
const {Schema , model} = mongoose;
const apprenticeshipSchema = new Schema({
    title: String,
    company_description: String,
    apprenticeship_description: String,
    introduction: String,
    team_type: String,
    team_role:[{
        role: {
            type: String,
            enum : ['IOS Developer', 'Android Developer', 'Full Stack Developer', 'Back-end Developer','Front-end Developer'],
            default: 'Android Developer'
        },
        describtion: String,
        required_skills: [String],
        complimentary_skills: [String],
        minimum_hours: Number,
        location: [String]
    }],
    team_admin:[{
    name: String,
    e_mail: String,
    linkedin: String
    }],
    time_line:{
        start_date: {
            type: Date,
            default: () => Date.now()
        },
        end_date: Date
    }

});
const Apprentice = model('Apprenticeship',apprenticeshipSchema);
export default Apprentice;