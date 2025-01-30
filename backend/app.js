const express=require('express')
var cors = require('cors')
require('dotenv').config()
const app=new express()
const PORT=process.env.PORT || 5000
const mongoose=require('mongoose')
const { userRoutes } = require('./Routes/userRoutes')
const { messageRoutes } = require('./Routes/messageRoues')

const MONGODB_URL=process.env.MONGODB_URL


app.use(cors())
app.use(express.json());
app.use(express.urlencoded())
app.use('/user/v2/api',userRoutes)
app.use('/user/v2/api',messageRoutes)


mongoose.connect(MONGODB_URL).then(
    () => {
        console.log("MongoDB connected successfully!");
        app.listen(PORT, () => {
            console.log(`Server is started at http://localhost:${PORT}`);
        });
    }
).catch(
    (error) => {
        console.log("MongoDB failed to connect", error);
    }
);
