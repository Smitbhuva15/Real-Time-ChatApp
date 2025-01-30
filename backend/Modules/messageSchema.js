const mongoose = require('mongoose')

const messageSchema=mongoose.Schema({
 
     senderId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "User",
       required: true,
     },
     receiverId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "User",
       required: true,
     },
     text: {
       type: String,
     },
     image: {
       type: String,
     },

    },{ timestamps: true })

const messageModel=mongoose.model('Message',messageSchema)
exports.messageModel=messageModel