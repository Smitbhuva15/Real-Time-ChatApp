const { messageModel } = require("../Modules/messageSchema");
const { userModel } = require("../Modules/userSchema");



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
            return req.status(400).json({ message: "Messages Not Found " })
        }

        return req.status(200).json({ messages: Messages })

    } catch (error) {
        console.log(error)
        return req.status(500).json({ message: "Internal Server Error " })

    }

}

exports.getUserForSlideBar = async (req, res) => {
    const loggedinuserid = req.user._id
    try {
        const allotherUser = await userModel.find({ id: { $ne: loggedinuserid } }, { password: 0 })

        if (!allotherUser) {
            return req.status(400).json({ message: "Frinds not found " })
        }
        return req.status(200).json({ users: allotherUser })


    } catch (error) {
        console.log(error)
        return req.status(500).json({ message: "Internal Server Error " })
    } 

}

exports.PostMessage = async (req, res) => {
    const myId = req.user._id;
    try {

        const id = req.params.id;
    const userToChatId = id;
    const { text } = user.body


    const message = await messageModel.create({
        senderId: myId,
        receiverId: userToChatId,
        text: text,

    })
   return res.status(200).json({message:"message send succesFully !!"})
     

    } catch (error) {
        console.log(error)
    return req.status(500).json({ message: "Internal Server Error " })
    }


}