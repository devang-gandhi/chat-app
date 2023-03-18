const mongoose = require('mongoose');
const dbConnection = ()=>{
    mongoose.connect(process.env.DB_URL, {
        useUnifiedTopology : true
    }).then(() => {
        console.log(`Database connected!`)
    }).catch((err) => {
        console.log(err);
    });
};
module.exports = {
    dbConnection
};