var React = require('react/addons');

var cx = React.addons.classSet;

module.exports = React.createClass({
  
  getInitialState() {
    return { text: '', valid: true }
  },

  handleChange(event) {
    if (/[^0-9a-zA-Z ]+/.test(event.target.value)) {
      return;
    }

    var valid = this.props.validate(event.target.value);

    this.setState({
      text: event.target.value,
      valid
    });
  },

  handleSubmit(event) {
    event.preventDefault();

    if (!this.state.valid) {
      return;
    }

    var node = this.refs.input.getDOMNode(),
        value = node.value;

    if (!value) {
      return;
    }

    this.props.onSubmit({ text: value });

    this.setState({ text: '' });
  },

  render() {
    return (
      <form
        className={
          cx({
            'bad': !this.state.valid
          })
        }
        onSubmit={this.handleSubmit}
        >
        <input
          ref="input"
          className="message-input form-control"
          value={this.state.text}
          onChange={this.handleChange}
          placeholder="Type a message here" />
      </form>
    );
  }
});
