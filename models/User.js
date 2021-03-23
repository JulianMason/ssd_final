const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    userType: {
        type: String,
        default: 'Admin',
        enum: ['Tester', 'Admin']
    },
    email: {
        type: String,
    },
    password: {
        type: String
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema);
module.exports = User

 