import React from 'react';

class HR extends React.PureComponent {
  render() {
    const { onClick, idyll, hasError, updateProps, ...props } = this.props;
    return (
      <div className="instructions">
        {props.children}
      </div>
    );
  }
}

export default HR;
