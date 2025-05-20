const mongoose = require('mongoose');


const countdownSchema = new mongoose.Schema({
    Date: { type:String, required: true },
    Time: {type:String, required:true }, 
    Event: {type:String, required:true }
},  {timestamps:true});
const CountdownDate = mongoose.model('CountdownDate', countdownSchema);
module.exports = CountdownDate;