const React = require('react');

class CustomComponent extends React.Component {

  constructor(props) {
    super(props);
    console.log('Initializing custom React component.')
  }

  handleClick() {
    // `updateProps` is a special function that allows you
    // to send updates back up to Idyll variables.
    this.props.updateProps({
      clickCount: this.props.clickCount + 1
    })
  }

  render() {
    const { hasError, idyll, updateProps, clickCount, ...props } = this.props;
    return (
      <div {...props} onClick={() => this.handleClick()}>
        <svg
          width={300}
          height={50}
          style={{ display: 'block', margin: '20px auto', background: 'white' }}
        >
          <rect width={50} height={50} y={0} x={25} fill={'#ddd'} />
          <circle cx={50} cy={25} r={15} x={25} fill={'#000'} />
          <rect width={50} height={50} y={0} x={125} fill={'#ddd'} />
          <circle cx={150} cy={25} r={15} x={25} fill={'#000'} />
          <rect width={50} height={50} y={0} x={225} fill={'#ddd'} />
          <circle cx={250} cy={25} r={15} x={25} fill={'#000'} />
        </svg>
      </div>
    );
  }
}

module.exports = CustomComponent;
