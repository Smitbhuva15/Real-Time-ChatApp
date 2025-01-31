const mongoose = require('mongoose')
const validator=require('validator')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minlength: [3, 'Full name must be at least 3 characters long'],
    },
   email: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return validator.isEmail(v);  
            },
            message: props => `${props.value} is not a valid email address!`  
        }

    },
   password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters long'],
    },
  

   profilephoto: {
        type: String,
      
    }


}, { timestamps: true })

const userModel=mongoose.model('User',userSchema)
exports.userModel=userModel
