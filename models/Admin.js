const mongoose = require('mongoose');

// creating Schema for Tasks
const taskSchema = new mongoose.Schema({
    Admin_Name: {
        type: String,
        required: true
    },
   password: {
        type: String,
        required: true
    },
   
});


const admin= mongoose.model('ADMIN', taskSchema);

// exporting the Schema
module.exports = admin;