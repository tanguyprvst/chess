let socket_io = require('socket.io');
var cookie = require('cookie');

const Game = require('./models/Game');
const Palyer = require('./models/core/Player');

let io = socket_io();
let socketApi = {};

//Your socket logic here
socketApi.io = io;

var numConnectedUsers = 0;
var connectedUsers = {};
var games = [];

io.on('connection', function(socket){

    // id
    numConnectedUsers += 1;
    var playerid = numConnectedUsers;

    // users
    connectedUsers[socket.id] = [];
    connectedUsers[socket.id]['player'] = new Palyer(playerid, "Guess" + playerid, socket.id);

    console.log('auth: ' + "Guess" + playerid)

    socket.on('create_game', create_game);
    socket.on('join_game', join_game);
    socket.on('play', play);
    socket.on('disconnect', disconnect);

    function create_game(username){
      if(connectedUsers[socket.id]['game'] != undefined){
        return io.to(socket.id).emit("create_game", 'Error');
      }
      // set username
      connectedUsers[socket.id]['player'].name = username;
      // new game
      var game = new Game(games.length, connectedUsers[socket.id]['player']);
      connectedUsers[socket.id]['game'] = game.id;
      socket.join(game.id);
      games.push(game)
      // socket
      io.to(socket.id).emit("create_game", game);
    }

    function join_game(username, code){
      connectedUsers[socket.id]['player'].name = username;
      // foreach games
      games.forEach(game => {
        if(code == game.code && game.listPlayers.length != 2){
          // foreach joueurs
          game.listPlayers.forEach(player => {
            if(connectedUsers[socket.id]['player'].id != player.id){
              // join game
              connectedUsers[socket.id]['game'] = game.id;
              game.listPlayers.push(connectedUsers[socket.id]['player']);
              socket.join(game.id);
              // start game
              game._start();
              // io
              io.to(socket.id).emit("join_game", game, connectedUsers[socket.id]['player']);
              io.to(game.listPlayers[0].socketid).emit("join_game", game,game.listPlayers[0]);
            }
          })
        }
      })
    }

    function play(c, nc){
      var gameid = connectedUsers[socket.id]['game'];
      var player = connectedUsers[socket.id]['player'];
      console.log(c + " - " + nc);
      games[gameid].play(c, nc, player.id, (r, p = null, nc = null) => {
        if(r){
          io.in(gameid).emit("play", p, nc);
        }
      });
    }

    function disconnect(reason){
      console.log('disconnect: ' + connectedUsers[socket.id]['player'].name + " : " +  reason);
      delete connectedUsers[socket.id];
    }

});



module.exports = socketApi;