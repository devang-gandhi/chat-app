const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { dbConnection } = require('./helpers/dbconfig');
const app = express();
const socket = require('socket.io');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');

app.use(cors());
app.use(express.json());
mongoose.set('strictQuery', true);

//API routers
app.use('/', userRoutes);
app.use('/chat', chatRoutes);


const server = app.listen(process.env.PORT, ()=> console.log(`Server is up on ${process.env.PORT}`));
dbConnection();

const io = socket(server, {
    cors : {
        origin : 'http://localhost:3000',
        credentials : true 
    },
});

global.onlineUsers = new Map();

io.on('connection', socket=>{
    global.chatSocket = socket;
    socket.on('add-user', userId=>{
        onlineUsers.set(userId, socket.id);
    });
    
    socket.on('req-msg', to_user_id=>{ //get user_id who ever user wants to send request
        socket.to(to_user_id).emit('show-req', {msg : "Message request has been receieved!"});
    });
    

    socket.on('send-msg', data=>{
       const sendUserSocket = onlineUsers.get(data.to);
       if(sendUserSocket && data.flag == 1){ //check whether req has been accepted if it is then msg- received event fired else nothing happened!
        socket.to(sendUserSocket).emit('msg-receieve', data.msg);
       } 
    });

    socket.on("disconnect", function() {
        console.log('disconnected from server!');
    });
});


//front-logic of req-msg and msg-receieve event

//socket.currentUser.on('show-req', data=>{
// setNotification({msg : data.msg}); using useState it is handled by frontEnd
//})


//socket.currentUser.on('msg-receieve', msg =>{
//  setmsgs({from : false, message : msg});  using useState it is handled by frontEnd
//})

