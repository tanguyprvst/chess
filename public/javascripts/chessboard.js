var e_drag = null;
var dropid = null;

var local = window.location.href

let localboard = []
let localuser = "";

let firstcase = null;
let overcase = null;

// #85F775
function allowDrop(ev) {
    ev.preventDefault();
}

function click(target) {
    a_case = target.id;

    if(firstcase != null){
        // remove color
        firstcase.classList.remove("selected");
        if(a_case[0] != 'c') a_case = target.parentElement.id;
        console.log(firstcase);
        socket.emit('play', firstcase.id, a_case);
        firstcase = null;
    }

    if(target.children.length > 0){
        // change la couleur de la case
        target.classList.add('selected')
        firstcase = target;
    }
}

function mouseover(target){
    if(overcase) overcase.classList.remove("over");
    target.classList.add('over')
    overcase = target
}

function drag(ev) {
    e_drag = ev.target;
    //ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    let target = ev.target;

    console.log(e_drag);
    dropid = target.id;
    if(dropid[0] != 'c') dropid = target.parentElement.id;
    socket.emit('play', e_drag.parentElement.id, dropid);
}

function generateChessboard(board, user){
    localboard = board;
    localuser = user;

    if(user.color == "white") return generateWhiteBoard(board, user);
    generateBlackBoard(board, user);
}

function generateBlackBoard(board, user){
    for (let x = 0; x < 8; x++) {
        for (let y = 7; y > -1; y--) {
            inBoard(board, user, y, x);
        }
    }
}

function generateWhiteBoard(board, user){
    for (let x = 7; x > -1; x--) {
        for (let y = 0; y < 8; y++) {
            inBoard(board, user, y, x);
        }
    }
}

function inBoard(board, user, y, x){
    var chessboard = document.getElementById('chessboard');
    var color = "black";
    if((x+y)%2) color = "white"

    var new_case = document.createElement('div');
    var case_id = "c-" + y + "-" + x;
    new_case.ondrop = drop;
    new_case.ondragover = allowDrop;
    new_case.id = case_id;

    if(board[y][x] != null){
        var piece = document.createElement('img');
        var piece_id = "p-" + board[y][x].id;
        piece.src = local + 'images/' + board[y][x].image; 
        piece.id = piece_id;
        piece.style.height = "80px";
        piece.style.width = "80px";
        if(user.id == board[y][x].player.id){
            piece.draggable = true;
            piece.addEventListener("dragstart" ,drag);
        }
        new_case.appendChild(piece);
    }
    new_case.onclick = function() { click(this); };
    new_case.onmouseover = function() { mouseover(this); };
    new_case.className = 'case ' + color;
    chessboard.appendChild(new_case);
}