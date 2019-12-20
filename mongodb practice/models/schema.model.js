const mongoose = require('mongoose');


let Employee = new mongoose.Schema({

    username: {
        type : String,
    
    },
    email: {
        type: String,
        require: true,
    }
});

module.exports =  mongoose.model('employee', Employee);