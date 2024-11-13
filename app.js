const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const app = express();  // Initialize the app here first
const server = http.createServer(app);  // Now the server can be created
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket){
    socket.on("send-location",function(data){
        io.emit("recieved-location",{id:socket.id,...data});

    });
    socket.on("disconnect",()=>{
        io.emit("user-disconnected",socket.id);
    })
});

app.get("/", (req, res) => {
    res.render("index");
});

server.listen(3000, () => {
    console.log("server is connected");
});
