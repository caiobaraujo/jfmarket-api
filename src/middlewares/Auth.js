const User= require("../models/User");

module.exports = {
    private: (req, res, next) => {
        
        if(!req.query.token && !req.body.token) {
            //res.json({notallowed: true});
            res.json({bodyouquerytoken:{notallowed: true}})
            
            return; 
        } 
        let token = '';
        if(req.query.token) {
            token = req.query.token;
        }
        if(req.body.token) {
            token = req.header.token;
        }
        if(token == '') {
            //res.json({notallowed: true});
            res.json({tokenvazio:{notallowed: true}})
            return;
        }

        const user = User.findOne({token});

        if(!user) {
           // res.json({notallowed: true});
           res.json({semuser:{notallowed: true}})
            return; 
        }
        
        next();
    }
}