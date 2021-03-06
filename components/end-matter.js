const React = require('react');

class EndMatter extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { hasError, idyll, updateProps, clickCount, ...props } = this.props;
    return (
      <div style={{margin: props.hasFinished ? '2em 0' : '50vh 0'}} >
        {
          props.hasFinished ?
            '' :
            'Click the button above to continue exploring the article.'
        }
      </div>
    );
  }
}

module.exports = EndMatter;
