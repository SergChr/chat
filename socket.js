let router = require("./routes/index");

io.on('connection', function (socket) {
    console.log("User connected.");
    
    socket.on("link", function (link) {
        // console.log(link);
        router.get("/" + link, function (req, res) {
            res.render("chat", {
                title: "Chat"
            });
        });

    });

    socket.on("message", function (info) {
        let data = JSON.parse(info);
        let message = JSON.stringify({ message: data["message"], from: data["from"] });
        io.emit(data["link"], message);
    });
    
    socket.on("typing", function(info){
        let data = JSON.parse(info);
        io.emit(data["link"]+" typing", data["username"]);
    });

});