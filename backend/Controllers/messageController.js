const { messageModel } = require("../Modules/messageSchema");
const { userModel } = require("../Modules/userSchema");
const { cloudinary } = require("../utils/Clodinary");



exports.getallmessages = async (req, res) => {
    const myId = req.user._id;
    try {
        const userToChatId = req.params.id;

        const condition = {
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        }

        const Messages = await messageModel.find({ condition })

        if (!Messages) {
            return res.status(400).json({ message: "Messages Not Found " })
        }

        return res.status(200).json({ messages: Messages })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error " })

    }

}

exports.getUserForSlideBar = async (req, res) => {
    const loggedinuserid = req.user._id
    try {
        const allotherUser = await userModel.find({ id: { $ne: loggedinuserid } }, { password: 0 })

        if (!allotherUser) {
            return res.status(400).json({ message: "Frinds not found " })
        }
        return res.status(200).json({ users: allotherUser })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error " })
    } 

}

exports.PostMessage = async (req, res) => {
    const myId = req.user._id;
    try {

     const id = req.params.id;
     
    const userToChatId = id;
    console.log(userToChatId)
    const { text,file } = req.body
     
   const response = await cloudinary.uploader.upload(file)

      const url = response.secure_url

  

    const message = await messageModel.create({
        senderId: myId,
        receiverId: userToChatId,
        text: text,
        image:url
    })
   return res.status(200).json({message:"message send succesFully !!"})
     

    } catch (error) {
        console.log(error)
    return res.status(500).json({ message: "Internal Server Error " })
    }


}