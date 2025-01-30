const express=require('express')
const { getallmessages, PostMessage, getUserForSlideBar } = require('../Controllers/messageController')
const { Authmiddel } = require('../middelware/Authmiddle')

const messageRoutes=express.Router()

messageRoutes.get('/all/message/:id',Authmiddel,getallmessages)
messageRoutes.get('/other/user',Authmiddel,getUserForSlideBar)
messageRoutes.get('/post/message/:id',Authmiddel,PostMessage)



exports.messageRoutes=messageRoutes