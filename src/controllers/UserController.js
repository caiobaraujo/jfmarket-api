const mongoose = require('mongoose');
const {validationResult, matchedData} = require('express-validator');
const bcrypt = require('bcrypt');

const State = require('../models/State');
const User = require('../models/User');
const Ad = require('../models/Ad');
const Category = require('../models/Category');

module.exports = {
    getStates: async(req, res) => {
        const states = await State.find();
        res.json(states);
    },
    info: async(req, res) => {
        let token = req.query.token;
        const user = await User.findOne({ token });
        const state = await State.findById(user.state);
        const ads = await Ad.find({ idUser: user._id.toString() });

        let adList = [];
        for(let i in ads) {
            const cat = await Category.findById(ads[i].category);

            adList.push({
                id: ads[i]._id,
                status: ads[i].status,
                images: ads[i].images,
                dataCreated: ads[i].dateCreated,
                title: ads[i].title,
                price: ads[i].price,
                priceNegotiable: ads[i].priceNegotiable,
                description: ads[i].description,
                views: ads[i].views,
                category: cat.slug
            });

            // adList.push({ ...ads[i].toJSON(), category: cat.slug });
        }

        res.json({
            name: user.name,
            email: user.email,
            state: state.name,
            ads: adList
        })
        
        
    },
    editAction: async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ error: errors.mapped() });
            return;
        }
        const data = matchedData(req);
        
        let updates = {};

        if(data.name) {
            updates.name = data.name;
        }
        if(data.email) {
            const emailCheck = await User.findOne({ email: data.email });
            if(emailCheck) {
                res.json({error: {email: {msg: 'Email already exists'}}});
                return;
            }
            updates.email = data.email;
        }

        if(data.state) {
                if(mongoose.Types.ObjectId.isValid(data.state)) {
                const stateCheck = await State.findById(data.state);
                if(!stateCheck) {
                    res.json({error: {state: {msg: 'State not found'}}});
                    return;
                }
                updates.state = data.state;
        }
        }

        if(data.password) {
            updates.passwordHash = await bcrypt.hash(data.password, 10);
        }
        //console.log("Os dados sao:", data);
        //console.log("Os updates sao:", updates);

        //await User.findByIdAndUpdate({token: data.token}, {$set: updates});
        await User.findOneAndUpdate({token: data.token}, updates);
        res.json({});
        
    }
   

}