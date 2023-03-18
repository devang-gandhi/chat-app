const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username :{
        type : String,
        required : true,
        min : 3,
        max : 20,
    },
    email :{
        type : String,
        required : true,
        unique : true,
        max : 20
    },
    password:{
        type :String,
        required : true,
        unique : true,
        min : 8
    },
    msgRequest : Array
});

module.exports = mongoose.model('Users', userSchema);