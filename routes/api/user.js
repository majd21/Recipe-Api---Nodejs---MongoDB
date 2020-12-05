const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const verifyToken = require('../../middleware/verify-token')

const router = express.Router()

//* Post req - Create a user
router.post('/auth/signup' , async (req , res) => {
    if (!req.body.email || !req.body.password) {
        res.json({
            status: false,
            message: "Please enter email or password!"
        })
    }else {
        try {
            let newUser = new User()
            newUser.name = req.body.name;
            newUser.email = req.body.email;
            newUser.password = req.body.password;

            await newUser.save()

            let token = jwt.sign(newUser.toJSON() , process.env.SECRET , {
                expiresIn: 604800
            })


            res.json({
                status: true,
                token,
                message: "Successfully create a new user"
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }
})

//* get req - get a user
router.get('/auth/user' , verifyToken , async (req ,res) => {
    try {
        let foundUser = await User.findOne({_id: req.decoded})
        if(foundUser) {
            res.json({
                status: true,
                user: foundUser
            })
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
})

//* post req - login user
router.post('/auth/login', async (req , res) => {
    try {
        let foundUser = await User.findOne({email: req.body.email})
        if(!foundUser) {
            res.status(403).json({
                status: false,
                message: "Authentication failed , user not found"
            })
        } else {
            if(foundUser.comparePassword(req.body.password)){
                let token = jwt.sign(foundUser.toJSON() , process.env.SECRET , {
                    expiresIn: 604800
                })
                res.json({
                    status: true,
                    token: token
                })
            }else {
                res.status(403).json({
                    status: false,
                    message: "Authentication failed , wrong password"
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
})

module.exports = router