const mongoose = require('mongoose');

// creating Schema for Tasks
const taskSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    U_id: {
        type: Number,
        required: true
    },
    email:{
        type:String,
        required:true
    },

    password: {
        type: String,
        required: true
    },
   
});


const USERS= mongoose.model('USERS', taskSchema);

// exporting the Schema
module.exports = USERS;