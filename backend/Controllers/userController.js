const { userModel } = require("../Modules/userSchema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.signup = async (req, res) => {
  const { firstName, lastName, email, password, profilephoto } = req.body;

  try {


    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Please Fill All The Details !!" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long !!" });

    }

    const isExist = await userModel.findOne({ email: email });

    if (isExist) {
      return res.status(400).json({ message: "User Already Exists With This Email !!" });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const userCreate = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword

    });


    return res.status(201).json({
      message: "User Created Successfully !!",
      user: {
        firstName: userCreate.firstName,
        lastName: userCreate.lastName,
        email: userCreate.email,

      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error !!" });
  }
};


exports.Login = async (req, res) => {

  const { email, password, confirmpassword } = req.body;

  try {


    if (!confirmpassword || !email || !password) {
      return res.status(400).json({ message: "Please Fill All The Details !!" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long !!" });

    }

    const isExist = await userModel.findOne({ email: email });

    if (!isExist) {
      return res.status(400).json({ message: "User Not Exists With This Email !!" });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Password and Confirm Password do not match!" });
    }

    const databasepassword = isExist.password
    const isMatched = await bcrypt.compare(password, databasepassword);

    if (!isMatched) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    const jwttoken = jwt.sign(
      {
        email: isExist.email, 
        _id: isExist._id       
      },
      process.env.JWT_SCRETE_KEY, 
      { expiresIn: '7d' }  
    );

 

    return res.status(200).json({
     message: "User logged in successfully!",
      user: {
        firstName: isExist.firstName,
        lastName: isExist.lastName,
        email: isExist.email,
        token:jwttoken

      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error !!" });
  }

}

exports.userDetails=async(req,res)=>{

  const userDetails=req.user;
  try {
    return res.status(500).json({ 
      user:userDetails ,
      message:"user data fetch successFullY!!"
    });

    
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error !!" });
    
  }

}


// exports.updatePhoto=async(req,res)={

  

// }