
const jwt = require('jsonwebtoken');
const { userModel } = require('../Modules/userSchema');

exports.Authmiddel=async(req,res,next)=>{

    const token = req.header("Authorization");

 
  if (!token) {
    return res.status(400).json({ message: "User not authenticated. Please logged in first." });
  }

  const jwtToken = token.split(" ")[1]; 

  try {
    
    const isVerify = jwt.verify(jwtToken, process.env.JWT_SCRETE_KEY);
   
    const email = isVerify.email; 

    
    const user_data = await userModel.findOne({ email:email }, { password: 0 });

    
      req.user = user_data; 
     
      next(); 


} catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error !!" });
}

}