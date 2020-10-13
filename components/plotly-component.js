const React = require('react');
const D3Component = require('idyll-d3-component');
const Plotly = require('plotly.js-basic-dist-min');
const maxHeightRatio = 0.75;

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
      if (height > maxHeightRatio * viewportHeight) {
        // ensure that graph doesn't take up more than 85% of screen height
        width = maxHeightRatio * viewportHeight * 1.618;
      }

      Plotly.react(this.state.node, this.props.data, this.props.layout(width), {displayModeBar: false});

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
      if (height > maxHeightRatio * viewportHeight) {
        // ensure that graph doesn't take up more than 85% of screen height
        width = maxHeightRatio * viewportHeight * 1.618;
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

      // this avoids a bug where layout hasn't finished updating?
      setTimeout(() => {
        let layout = this.props.layout(this.state.width);
        //console.log(layout.annotations.map(e => e.text));
        Plotly.react(this.state.node, props.data, layout, {displayModeBar: false});
      }, 50);

    }

  }

}

module.exports = plotlyComponent;
