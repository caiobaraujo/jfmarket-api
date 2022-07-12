const {checkSchema} = require('express-validator');


module.exports = {
    editAction: checkSchema({
        token: {
            notEmpty: true
        },

        name: {
            optional: true,
            trim: true,
            isLength: {
                options: {min: 3, max: 30}
        },
        errorMessage: 'Name must be between 3 and 30 characters'
    },
    email: {
        optional: true,
        isEmail: true,
        normalizeEmail: true,
        errorMessage: 'Invalid email'
    },
    password: {
        optional: true,
        isLength: {
            options: {min: 6, max: 30}
        },
        errorMessage: 'Password must be between 6 and 30 characters'
    },
    state: {
        optional: true,
        notEmpty: true,
        errorMessage: 'State is required'
    }
    

})

}