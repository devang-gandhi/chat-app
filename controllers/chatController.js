const Chat = require('../models/chatModel');

module.exports.addmsg = async(req, res)=>{
    try {
        const {from, to, message, flag} = req.body; //flag is for check if user accepts req or not.

        if(flag != true || flag == '') return res.status(400).json({msg : `User doen't accept the request so message can't be saved anymore!`, flag : false});
        const data = await Chat.create({
            text : message,
            users : [from, to],
            sender : from
        });

        if(data) return res.status(200).json({msg : 'Message saved succesfully!', flag : true});
        return res.status(400).json({msg : 'Failed to save message!', flag : false});

    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports.getmsg = async(req, res)=>{
    try {
        const {from, to} = req.body;
        const messages = await Chat.find({users : {$all : [from, to]}}).sort({updatedAt : 1});

        const modifymsg = messages.map(msg =>{
            return {
                from : msg.sender.toString() === from,
                message : msg.text
            }
        }); //if from is true that means it's sender else it's receiever

        return res.status(200).json(modifymsg);
    } catch (error) {
        return res.status(500).json(error);
    }
};