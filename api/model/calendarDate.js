const mongoose = require('mongoose');


const calendarSchema = new mongoose.Schema({
    Date: { type:Date, required: true },
    Title: {type:String, required:true }, 
    Content: {type:String, required:true }, 
},  {timestamps:true});
const CalendarDate = mongoose.model('CalendarDate', calendarSchema);
module.exports = CalendarDate;