const User= require("../models/User");

module.exports = {
    private: (req, res, next) => {
        
        if(!req.query.token && !req.header.token) {
            res.json({notallowed: true});
            return; 
        } 
        let token = '';
        if(req.query.token) {
            token = req.query.token;
        }
        if(req.header.token) {
            token = req.header.token;
        }
        if(token == '') {
            res.json({notallowed: true});
            return;
        }

        const user = User.findOne({token});

        if(!user) {
            res.json({notallowed: true});
            return; 
        }
        
        next();
    }
}