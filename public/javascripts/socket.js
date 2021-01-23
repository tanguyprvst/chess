$(function () {

    var played_case_1 = null;
    var played_case_2 = null;

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

      if(played_case_1 != null){
        played_case_1.removeClass('played_1');
        played_case_2.removeClass('played_2');
      }
      
      var c = $("#" + c);
      var c_nc = $("#" + nc);
      var c_c = c.parent();

      var pnc = c_nc.children();
      pnc.remove();

      c_nc.prepend(c)

      played_case_1 = c_c;
      played_case_2 = c_nc;
      c_c.addClass('played_1');
      c_nc.addClass('played_2');
    });
});