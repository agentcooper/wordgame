var express = require('express');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var _ = require('underscore');

app.use(express.static('public'));

var words = require('./words');

var gameState = {
  host: null,

  word: words[0],

  secret: 'fuck you',
  
  round: 1,

  players: {}
};

function nextRound() {
  gameState.round += 1;

  gameState.word = _.sample(words);

  gameState.host = nextHost();

  sendGameState();

  if (gameState.host) {
    io.to(gameState.players[gameState.host].id)
      .emit('new_secret', gameState.word);
  }
}

var clients = {};

var messages = [];

function nextHost() {
  var players = Object.keys(gameState.players);

  if (players.length < 2) {
    return null;
  }

  var candidates = _.without(players, gameState.host);

  return _.sample(candidates);
}

function sendGameState() {
  io.sockets.emit('gameState', {
    host: gameState.host,
    // word: { text: gameState.word.text },
    round: gameState.round,
    players: gameState.players
  });
}

io.on('connection', function(socket) {

  var addedUser = false;

  socket.on('new_player', function(player) {

    socket.username = player.username;

    gameState.players[player.username] = {
      username: player.username,
      id: socket.id,
      points: 0
    };

    clients[player.username] = socket;

    io.sockets.emit('messages', messages);

    if (Object.keys(gameState.players).length > 1) {
      nextRound();
    }

    sendGameState();

    addedUser = true;

    console.log('added', player);

    socket.emit('login', { username: player.username });
  });

	socket.on('chat_message', function(message){
    console.log(message, gameState.word.value);

    if (socket.username === gameState.host) {

      if (message.text === gameState.word.value) {
        io.sockets.emit('new_message', {
          author: 'God',
          text: 'You should not do this! -0.3 for ' + socket.username
        });

        gameState.players[socket.username].points -= 0.3;

        sendGameState();
      
        return;
      }
    }

    messages.push(message);
    io.sockets.emit('new_message', message);

    if (message.text === gameState.word.value) {

      console.log('Good!');
      io.sockets.emit('new_message', {
        author: 'God',
        text: '+1 for ' + socket.username
      });

      gameState.players[socket.username].points += 1;
      nextRound();
    }
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');

    if (addedUser) {
      delete gameState.players[socket.username];
      // io.sockets.emit('players', players);
      gameState.host = nextHost();

      sendGameState();
    }
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
