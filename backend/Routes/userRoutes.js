const express=require('express')
const { signup, Login, userDetails } = require('../Controllers/userController')
const { Authmiddel } = require('../middelware/Authmiddle')


const userRoutes=express.Router()

userRoutes.post('/signup',signup)
userRoutes.post('/login',Login)
userRoutes.get('/userinfo',Authmiddel,userDetails)


exports.userRoutes=userRoutes