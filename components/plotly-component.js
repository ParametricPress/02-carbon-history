const React = require('react');
const D3Component = require('idyll-d3-component');
const Plotly = require('plotly.js');

let graphDiv;

var trace = {
  x: [1, 2, 3, 4],
  y: [12, 9, 15, 12],
  mode: 'lines+markers',
  type: 'scatter'
};

var data = [trace];

var layout = {
  title: 'Plotly Graph Hooray!',
  font: {size: 18}
};

var config = {responsive: true}

class plotlyComponent extends D3Component {

  initialize(node, props) {

    Plotly.newPlot(node, data, layout, config);

    graphDiv = node;

  }

  update(props, oldProps) {

    //console.log('plotly props changed!');

    /* this is a hack to resize the p5 sketch once its containing conditional becomes visible */
    if (props.isVisible !== oldProps.isVisible) {

      setTimeout(function() {
        Plotly.newPlot(graphDiv, data, layout);
      }, 50);

    } else {

      data[0].y = Array(4).fill(0).map(e => Math.random(12));

      Plotly.react(graphDiv, data, layout, config);

    }

  }

}

module.exports = plotlyComponent;
