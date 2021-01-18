$(function () {

    $('#create_game').submit(function(e) {
      e.preventDefault(); // prevents page reloading
      socket.emit('create_game', $('#username').val());
      return false;
    });

    $('#play').submit(function(e) {
        e.preventDefault(); // prevents page reloading
        socket.emit('play', $('#c').val(), $('#nc').val());
        return false;
      });

    $('#join_game').submit(function(e) {
        e.preventDefault(); // prevents page reloading
        socket.emit('join_game', $('#username').val(), $('#code').val());
        return false;
    });

    $('#send_message').submit(function(e) {
        e.preventDefault(); // prevents page reloading
        socket.emit('speak_room', $('#msg').val());
        return false;
    });

    socket.on('create_game', function(game){
        $('#codes').append($('<li>').text('code: ' + game.code));
    });

    socket.on('join_game', function(game, user){
      $('#join').append($('<li>').text('game n' + game.id + ', Players: ' + game.listPlayers[0].name + " & " + game.listPlayers[1].name));
      generateChessboard(game.board, user);
    });

    socket.on('play', function(c, nc){
      var c = $("#" + c);

      var pnc = $("#" + nc).children();
      pnc.remove();

      $("#" + nc).prepend(c)
    });
});