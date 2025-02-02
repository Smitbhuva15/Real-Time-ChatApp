
const express = require('express');
const http = require('http');
const cors = require('cors');
require('dotenv').config();


const PORT=process.env.PORT || 5000
const mongoose=require('mongoose')
const { userRoutes } = require('./Routes/userRoutes')
const { messageRoutes } = require('./Routes/messageRoues');
const { app,server } = require('./utils/Socketio');

const MONGODB_URL=process.env.MONGODB_URL


app.use(cors())
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/user/v2/api',userRoutes)
app.use('/user/v2/api',messageRoutes)


mongoose.connect(MONGODB_URL).then(
    () => {
        console.log("MongoDB connected successfully!");
        server.listen(PORT, () => {
            console.log(`Server is started at http://localhost:${PORT}`);
        });
    }
).catch(
    (error) => {
        console.log("MongoDB failed to connect", error);
    }
);
