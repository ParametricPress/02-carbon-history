const React = require('react');
const D3Component = require('idyll-d3-component');
const Plotly = require('plotly.js-basic-dist-min');

class plotlyComponent extends D3Component {

  constructor(props) {
    super(props);
    this.state = {
      node: NaN,
      graphCreated: false,
      width: 0
    };
  }

  initialize(node, props) {

    this.createGraph = this.createGraph.bind(this);

    this.resize = this.resize.bind(this);
    window.addEventListener('resize', this.resize);

    this.setState((state) => {
      return {
        node: node
      }
    });

    setTimeout(this.createGraph, 50);
    
  }

  createGraph() {
    
    let width = this.state.node.getBoundingClientRect().width;

    if (width > 0) {
      //console.log('Plotly Graph Created', this.props);
      let height = width/1.618;
      let viewportHeight = window.innerHeight;
      if (height > 0.95 * viewportHeight) {
        // ensure that graph doesn't take up more than 95% of screen height
        width = 0.95 * viewportHeight * 1.618;
      }
      Plotly.newPlot(this.state.node, this.props.data, this.props.layout(width), {displayModeBar: false});

      this.setState((state) => {
        return {
          graphCreated: true,
          width: width
        }
      });

    }
  }

  resize() {

    if (this.state.graphCreated) {
      //console.log('Plotly Graph Resized');
      let width = this.state.node.getBoundingClientRect().width;
      let height = width/1.618;
      let viewportHeight = window.innerHeight;
      if (height > 0.95 * viewportHeight) {
        // ensure that graph doesn't take up more than 95% of screen height
        width = 0.95 * viewportHeight * 1.618;
      }
      Plotly.react(this.state.node, this.props.data, this.props.layout(width), {displayModeBar: false});

      this.setState((state) => {
        return {
          width: width
        }
      });
    }
  }

  update(props, oldProps) { // runs on prop change

    if (!this.state.graphCreated) {
      setTimeout(this.createGraph, 50);
    } else {
      //console.log('Plotly Graph Updated', props);
      Plotly.react(this.state.node, props.data, props.layout(this.state.width), {displayModeBar: false});
    }

  }

}

module.exports = plotlyComponent;
