var React = require('react');

module.exports = React.createClass({
  
  isHost(player) {
    return player.username === this.props.game.host;
  },

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">Player list</div>
        <ul className="list-group">
          {
            Object.keys(this.props.game.players).map(username => {
              var player = this.props.game.players[username];

              var icon;

              if (this.isHost(player)) {
                icon = <span className="glyphicon glyphicon-star"></span>
              } else {
                icon = <span className="glyphicon glyphicon-user"></span>
              }

              return (
                <li className={'list-group-item'}>
                  <span className="badge">{player.points}</span>
                  {icon}
                  &nbsp;<span className={
                    this.isHost(player) ? 'host' : ''
                  }>{username}</span>
                  &nbsp;<span>
                  </span>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
});
