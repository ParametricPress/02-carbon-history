const React = require('react');
const D3Component = require('idyll-d3-component');
const Plotly = require('plotly.js-basic-dist-min');

class plotlyComponent extends D3Component {

  constructor(props) {
    super(props);
    this.state = {node: NaN};
  }

  initialize(node, props) {
    Plotly.newPlot(node, props.data, props.layout, props.config);
    this.setState((state) => {
      return {node: node}
    });
  }

  update(props, oldProps) {
    //console.log('plotly props changed');

     // this is a hack to resize the plotly graph once its containing conditional becomes visible
    if (props.isVisible !== oldProps.isVisible) {
      console.log('creating Plotly graph');
      setTimeout(() => Plotly.newPlot(this.state.node, props.data, props.layout, props.config), 50);
    }
    else {
      // manually update graph on props change
      console.log('updating Plotly graph');
      Plotly.react(this.state.node, props.data, props.layout, props.config);
    }

  }

}

module.exports = plotlyComponent;
