const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports.register = async(req, res)=>{
    try {
        const  {username, email, password, msgRequest} = req.body;

        if(username == '' || password == '' || email == '') return res.status(400).json({msg : 'Please fill all details correctly!', status : false});
        if(email.match('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$') == null) return res.status(400).json({msg : 'Not an valid email!', status : false}); 
        const emailCheck = await User.findOne({email});
    
        if(emailCheck){
            return res.status(400).json({msg : 'Email is already registered!', status : false});
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({username, email, password : hashedPassword, msgRequest});
    
        delete user.password;

        return res.status(200).json({status :true, user });
    } catch (error) {
        return res.status(404).json({error, status : false});
    }
};

module.exports.login = async(req, res)=>{
    try {
        const  {email, password} = req.body;
        const emailCheck = await User.findOne({email});
    
        if(!emailCheck){
            return res.status(200).json({msg : 'Incorrect email or password!', status : false});
        }
    
        const passwordCheck = await bcrypt.compare(password, emailCheck.password);

        if(!passwordCheck){
            return res.status(200).json({msg : 'Incorrect email or password!', status : false});
        }
    
        const token = jwt.sign({id:emailCheck._id}, process.env.TOKEN);

        return res.status(200).json({status :true, user : {token, id : emailCheck._id, acceptedRequests : emailCheck.msgRequest}, message : 'Login successful!'});
    } catch (error) {
        return res.status(500).json({error, status : false});
    }
};

module.exports.getUsers = async(req, res)=>{
    try {
        const users = await User.find({_id : {$ne : req.params.id}}, {email : 1, username : 1, _id : 1, msgRequest : 1});
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports.acceptRequest = async(req, res)=>{
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {$push : { msgRequest: req.params.req_user_id }});
        return res.status(200).json(user);
    } catch (error) {
        return res.status(404).json({error, status : false});
    }
};