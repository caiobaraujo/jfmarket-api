const {checkSchema} = require('express-validator');

module.exports = {
    signup: checkSchema({
        name: {
            trim: true,
            isLength: {
                options: {min: 3, max: 30}
        },
        errorMessage: 'Name must be between 3 and 30 characters'
    },
    email: {
        isEmail: true,
        normalizeEmail: true,
        errorMessage: 'Invalid email'
    },
    password: {
        isLength: {
            options: {min: 6, max: 30}
        },
        errorMessage: 'Password must be between 6 and 30 characters'
    },
    state: {
        notEmpty: true,
        errorMessage: 'State is required'
    }
    

}),
    signin: checkSchema({
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'Invalid email'
        },
        password: {
            isLength: {
                options: {min: 6, max: 30}
            },
            errorMessage: 'Password must be between 6 and 30 characters'
        }
    })

}