const jwt = require('jsonwebtoken');

module.exports.auth =(req,res,next)=>{
    try {
        const token = req.header('auth-token');
        if(!token) return res.status(401).send('Access denided!');
        const verifiedtoken = jwt.verify(token, process.env.TOKEN);
        if(verifiedtoken.id != req.params.id && verifiedtoken.id != req.body.from) return res.status(401).send('Access denided!'); 
        next();
    } catch (err) {
        return res.status(500).json({message :'Server error' ,err});
    }
};