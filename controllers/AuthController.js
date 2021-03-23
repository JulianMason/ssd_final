const User = require('../models/User')
const connectDB = require('../models/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

connectDB();

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        if(err) {
            res.json({
                error: err
            })
        }
        const user = new User ({
            name: req.body.name,
            userType: req.body.userType,
            email: req.body.email,
            password: hashedPass
        })
        user.save()
        .then(user => {
            res.json({
                message: 'New User Successfully Added!'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occured :('
            })
        })

        
    })
    
}

login = (req, res, next) => {
    var email = req.body.email
    var password = req.body.password

    User.findOne({email:email})
    .then (user => {
        if(user){
            bcrypt.compare(password, user.password, function(err, result){
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({name: user.name}, 'verySecretValue', {expiresIn: '1h'})
                    res.json({
                        message: 'Login successful!',
                        token
                    })
                } else{
                    res.json({
                        message: 'Incorrect email or password'
                    })
                }
            })
        }else {
            res.json({
                message: 'User does not exist'
            })
        }
    })
}

module.exports = {
    register, login
}