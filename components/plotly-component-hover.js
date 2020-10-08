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
      if (height > 0.85 * viewportHeight) {
        // ensure that graph doesn't take up more than 85% of screen height
        width = 0.85 * viewportHeight * 1.618;
      }

      let myPlot = this.state.node;

      Plotly.react(myPlot, this.props.data, this.props.layout(width), {displayModeBar: false});

      myPlot.on('plotly_hover', function(data){
        if (data.points.length > 0) {
          var tn = data.points[0].curveNumber;
          var pn = data.points[0].pointNumber;
          var colors = data.points[0].data.marker.color;
          colors[pn] = '#D8FFA2';
          var update = {'marker':{color: colors}};
          Plotly.restyle(myPlot, update, [tn]);
        }
      });

      myPlot.on('plotly_unhover', function(data){
        if (data.points.length > 0) {
          var tn = data.points[0].curveNumber;
          var pn = data.points[0].pointNumber;
          var colors = data.points[0].data.marker.color;
          colors[pn] = '#666666';
          var update = {'marker':{color: colors}};
          Plotly.restyle(myPlot, update, [tn]);
        }
      });


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
      if (height > 0.85 * viewportHeight) {
        // ensure that graph doesn't take up more than 85% of screen height
        width = 0.85 * viewportHeight * 1.618;
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
