const mongoose = require('mongoose');

// creating Schema for Tasks
const taskSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    card_id: {
        type: Number,
        required: true
    },
    gender:{
        type:String,
        required:true
    },
    Age:{
        type:Number,
        required:true
    }
,

    address: {
        type: String,
        required: true
    },
    Phone:{
        type:Number,
        required:true,
    },
    Department:{
        type:String,
        required:true,
    },

    Doctor_name:{
        type:String,
        required:true
    }
});


const Patient= mongoose.model('Patient', taskSchema);

// exporting the Schema
module.exports = Patient;