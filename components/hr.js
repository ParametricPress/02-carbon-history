import React from 'react';

class HR extends React.PureComponent {
  render() {
    const { onClick, idyll, hasError, updateProps, ...props } = this.props;
    return (
      <div className="separator">
        <div className="separator-item"></div>
        <div className="separator-item"></div>
        <div className="separator-item"></div>
      </div>
    );
  }
}

export default HR;
