window.onload = function () {
    let socket = io();

    let chatwindow = document.querySelector(".chatwindow"),
        messageArea = document.querySelector(".messageArea"),
        link = window.location.pathname.split("/")[1],
        windowHeight = document.documentElement.clientHeight,
        nickname = document.querySelector(".nickname");

    // generat nickname
    let username = "User-" + getRandom(1000, 99999);

    nickname.innerHTML = username;
    // change nickname
    nickname.onclick = function () {
        let inp = document.createElement("input");
        inp.setAttribute("type", "text");
        inp.value = username;

        document.querySelector(".nicknameDiv").appendChild(inp);

        // if pressed 'Enter' -> change nickname
        inp.onkeypress = function (e) {
            if (e.keyCode == 13) {
                let data = JSON.stringify({
                    link: link,
                    message: username + " changed nickname to " + inp.value,
                    from: "Server"
                });
                username = inp.value;
                inp.remove();
                nickname.innerHTML = username;


                socket.emit("message", data);
            }
        }

    }

    chatwindow.style.height = windowHeight - 200 + "px";

    // "Enter" -> send message
    messageArea.onkeypress = function (e) {
        if (e.keyCode == 13) {
            send();
            // Send that user is typing now
        } else {
            let data = JSON.stringify({
                link: link,
                username: username
            });
            socket.emit("typing", data);
        }
    }

    function send() {
        let message = messageArea.value,
            data = JSON.stringify({
                link: link,
                message: message,
                from: username
            });
        if (message.length < 1 || message.indexOf("<") != -1 && message.indexOf(">") != -1) {
            console.error("Message has bad format!");
            return;
        }
        socket.emit("message", data);
        messageArea.value = "";
    }

    // on get message from server
    socket.on(link, function (message) {
        let data = JSON.parse(message);

        let msgDiv = document.createElement("div");
        msgDiv.classList.add("messageDiv");

        let msg = document.createElement("div");
        msg.classList.add("message");
        msg.innerHTML = data["message"];

        let userDiv = document.createElement("div");
        userDiv.classList.add("userDiv");
        userDiv.innerHTML = data["from"];

        msgDiv.appendChild(userDiv);
        msgDiv.appendChild(msg);

        if (data["from"] == "Server") {
            userDiv.style.backgroundColor = "#999";
            msg.style.backgroundColor = "#ccc";
        } else if (username !== data["from"]) {
            msg.style.backgroundColor = "rgba(127, 191, 63, 0.5)";
        } else {
            userDiv.innerHTML = "Me";
        }

        chatwindow.appendChild(msgDiv);
        msgDiv.scrollIntoView(false);
    });


    socket.on(link + " typing", function (user) {

        if (user == username) {
            return;
        } else {
            document.querySelector(".typing").style.width = chatwindow.clientWidth + "px";
            document.querySelector(".typing").innerHTML = user + " is typing...";
            
            // hide typing message after 2 seconds
            setTimeout(function () {
                document.querySelector(".typing").innerHTML = "";
            }, 2000);
        }
    });

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}