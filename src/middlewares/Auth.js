const User = require('../models/User');

module.exports = {
    private: async(req, res, next) =>{

        if(!req.query.token && !req.body.token) {
            res.json({notalloweddddd: true});
            console.log("nao tem body", req.body.token);
            console.log("nao tem query", req.query.token);
            return;
        }

        let token = '';
        if(req.query.token){
            token = req.query.token;
        }
        if(req.body.token){
            token = req.body.token;
        }

        if(token==''){
            res.json({notallowed: true});
            return;
        }
        console.log(token);
        const user = await User.findOne({token});
        if(!user){
            res.json({notallowed: true});
            return;
        }

        next();
    }
};