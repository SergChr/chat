window.onload = function () {
    let socket = io();
    let but = document.getElementById("createRoom"),
        alphabet = 'abcdefghijklmnopqrstuvwxyz';


    but.onclick = function () {
        let link = [];
        for(let i = 0; i < 8; i++){
            link.push(alphabet[getRandom(0, alphabet.length)]);
            link.push(getRandom(0, 9));
        }
        link = link.join("");
        socket.emit("link", link);
        window.location.href = link;
    }

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}