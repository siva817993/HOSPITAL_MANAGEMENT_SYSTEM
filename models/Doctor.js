const mongoose = require('mongoose');

// creating Schema for Tasks
const taskSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Doctor_id: {
        type:Number,
       
    },
    gender:{
        type:String,
        required:true
    },
    
    address: {
        type: String,
        required: true
    },
    Phone:{
        type:Number,
        required:true,
    },
    Date:{
        type:Date,
        required:true,
    }

   
});


const Doctor= mongoose.model('Doctor', taskSchema);

// exporting the Schema
module.exports = Doctor;