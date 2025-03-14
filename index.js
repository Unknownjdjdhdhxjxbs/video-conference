const express= require("express");
const app = express();
const http=require("http").Server(app);
const io =require("socket.io")(http);
app.set("view engine", "ejs");
const { v4 :uuidv4}= require("uuid");
http.listen(3000, ()=>{
    console.log("running on port 3000");
})
// app.use(express.static("C:/Users/SRUTHI/OneDrive/Desktop/server-3/app.html"));
io.on("connection", (socket)=>{
    socket.on('join-room', (roomId, userId) =>{
        // console.log(roomId, userId);
        socket.join(roomId)
        socket.broadcast.to(roomId).emit('user-connected',userId);
    })
})
app.get("/", (req, res)=>{
    res.redirect(`/${uuidv4()}`);
})
app.get(`/:room`, (req, res)=>{
    res.sendFile('C:/Users/SRUTHI/OneDrive/Desktop/server-3/app.html', {roomId: req.params.room});
})
