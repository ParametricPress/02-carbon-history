const React = require('react');
import Plot from 'react-plotly.js';

class ReactPlotlyComponent extends React.Component {

  constructor(props) {
    super(props);
    console.log('Initializing plotly component.')
    //this.state = { redrawCount: 0 };
    this.redraw = this.redraw.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.update(nextProps, this.props);
  }

  shouldComponentUpdate() {
    return false;
  }

  /*
  redraw() {
    this.setState((state) => {
      // Important: read `state` instead of `this.state` when updating.
      return {redrawCount: state.redrawCount + 1}
    });
    console.log(this.state.redrawCount);
  }
  */

  update(props, oldProps) {

    console.log('props changed!', props);

    /* this is a hack to resize the graph once its containing conditional becomes visible */
    //setTimeout(this.redraw, 200);

  }

  onUpdate(figure, graphDIV) {
    console.log('graph updated');
  }


  redraw() {
    // `updateProps` is a special function that allows you
    // to send updates back up to Idyll variables.
  }

  render() {

    const { hasError, idyll, updateProps, clickCount, ...props } = this.props;

    return (
        <Plot
            useResizeHandler={true}
            data={this.props.data}
            layout={this.props.layout}
            revision={this.props.redrawCount}
            //frames={this.state.frames}
            config={this.props.config}
            //onInitialized={(figure) => this.setState(figure)}
            onUpdate={this.onUpdate}
        />
    );
  }

}

module.exports = ReactPlotlyComponent;
