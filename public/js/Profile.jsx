var React = require('react');

module.exports = React.createClass({
  isHost: function() {
    return this.props.game.host === this.props.profile.username;
  },

  render: function() {
    var message;

    if (this.props.game.host) {
      message =
        this.isHost() ?
        (
          <p>
            You are a host.
            <h2>Explain:</h2>
            <div className="alert alert-success" role="alert">
              {this.props.profile.secret.value}
            </div>
            <ul className="list-unstyled">{
              this.props.profile.secret.stopwords.map(function(word) {
                return <li>{word}</li>
              })
            }</ul>
          </p>
        ) :
        (<p>{this.props.game.host} is host now.</p>)
    } else {
      message = <p>Wait for other players now.</p>
    }

    return (
      <div className="profile">
        <p>Hi, {this.props.profile.username}.</p>

        {message}
      </div>
    )
  }
});
