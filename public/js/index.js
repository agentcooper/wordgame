var React = require('react');

var io = require('socket.io-client');

var Chat = require('./Chat.jsx');

var UserInput = require('./UserInput.jsx');

var Profile = require('./Profile.jsx');

var PlayerList = require('./PlayerList.jsx');

var App = React.createClass({
  getInitialState: function() {
    var that = this;

    this.socket = io();

    this.socket.on('new_message', function(message) {
      console.log(message);

      that.state.messages.push(message);

      if (message.secret) {
        that.state.profile.secret = message.text;

        that.setState({ profile: that.state.profile });
      }

      that.setState({ messages: that.state.messages });
    });

    this.socket.on('new_secret', function(secret) {
      console.log(secret);

      that.state.messages.push({
        author: 'God',
        text: 'Explain ' + secret.value
      });

      that.state.profile.secret = secret;

      that.setState({ profile: that.state.profile });

      that.setState({ messages: that.state.messages });
    });

    this.socket.on('player_left', function(username) {
      console.log(username, 'left');
    });

    this.socket.on('messages', function(messages) {
      that.setState({ messages: messages });
    });

    this.socket.on('gameState', function(gameState) {
      console.log('gameState', gameState);
      that.setState({ gameState: gameState });
    });

    this.socket.on('login', function(login) {
      that.state.profile.username = login.username;
      that.setState({ profile: that.state.profile });
    });

    var profile = {
      username: '',

      secret: {
        value: '',
        stopwords: []
      }
    };

    if (profile.username) {
      this.socket.emit('new_player', { username: profile.username });
    }

    return {
      profile: profile,

      messages: [],

      gameState: {
        host: null,
        question: '',
        players: {}
      }
    }
  },

  sendMessage: function(message) {
    message.author = this.state.profile.username;
    this.socket.emit('chat_message', message);
  },

  isHost: function() {
    return this.state.profile.username === this.state.gameState.host;
  },

  checkMessage: function(text) {
    if (/[^0-9a-zA-Z ,!?\.]+/.test(text)) {
      return false;
    }

    if (!this.isHost()) {
      return true;
    }

    var secret = this.state.profile.secret;

    return secret.stopwords.concat(secret.value).every(function(word) {
      return text.indexOf(word) === -1;
    });
  },

  login: function(event) {
    event.preventDefault();

    var username = this.refs.username.getDOMNode().value;

    if (username) {
      this.socket.emit('new_player', { username: username });
    }
  },

  render: function() {
    var login =
    <div className="col-md-3">
      <p>Server chooses a host. Host gets a word.
      Host needs to explain it to other players without saying the original word
      or some extra words. Each round there is a new host. Have fun.</p>

      <form onSubmit={this.login}>
        <div className="form-group">
          <label htmlFor="username">Username</label>

          <input
            type="text"
            id="username"
            ref="username"
            className="form-control"
            placeholder="Username" />
        </div>

        <div>
          <button type="submit" className="btn btn-default">Play</button>
        </div>
      </form>
    </div>

    var game =
    <div>
      <div className="col-md-3">
        <PlayerList game={this.state.gameState} />
      </div>

      <div className="col-md-6">
        <Chat messages={this.state.messages} />
        <UserInput onSubmit={this.sendMessage} validate={this.checkMessage}/>
      </div>

      <div className="col-md-3">
        <Profile game={this.state.gameState} profile={this.state.profile} />
      </div>
    </div>

    return (
      <div className="container">
        <div className="header">
          <h3 className="text-muted">WordGame</h3>
        </div>

        <div className="row">
          { this.state.profile.username ? game : login }
        </div>
      </div>
    );
  }
});

React.render(<App/>, document.querySelector('.app'));
