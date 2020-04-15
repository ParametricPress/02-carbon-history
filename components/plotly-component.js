const React = require('react');
const D3Component = require('idyll-d3-component');
const Plotly = require('plotly.js');

let graphDiv;

class plotlyComponent extends D3Component {

  initialize(node, props) {
    Plotly.newPlot(node, props.data, props.layout, props.config);
    graphDiv = node;
  }

  update(props, oldProps) {
    //console.log('plotly props changed', props);

    if (props.isVisible !== oldProps.isVisible) {
      // this is a hack to resize the plotly graph once its containing conditional becomes visible
      setTimeout(function() {
        Plotly.newPlot(graphDiv, props.data, props.layout, props.config);
      }, 50);
    } else {
      // manually update graph on props change
      Plotly.react(graphDiv, props.data, props.layout, props.config);
    }

  }

}

module.exports = plotlyComponent;
