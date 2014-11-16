var React = require('react');

module.exports = React.createClass({
  
  componentWillUpdate() {
    var node = this.getDOMNode();

    this.shouldScrollBottom
      = node.scrollTop + node.offsetHeight === node.scrollHeight;
  },

  componentDidUpdate() {
    if (!this.shouldScrollBottom) {
      return;
    }

    this.scrollDown();
  },

  scrollDown() {
    var node = this.getDOMNode();
    node.scrollTop = node.scrollHeight;
  },

  componentDidMount() {
    this.scrollDown();
  },

  render() {
    return (
      <ul className="chat list-unstyled" ref="chat">
      {
        this.props.messages.map(message => { 
          var icon;

          if (message.author === 'God') {
            icon = <span className="glyphicon glyphicon-fire"></span>
          }

          return (
            <li className="message">
              {icon}&nbsp;<span>{message.author}</span>: {message.text}
            </li>
          );
        })
      }
      </ul>
    )
  }
});
