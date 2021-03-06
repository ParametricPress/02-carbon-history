const React = require('react');
const D3Component = require('idyll-d3-component');
const p5 = require('p5');

class p5Component extends D3Component {

  constructor(props) {
    super(props);
    this.state = {sketch: NaN};
  }

  initialize(node, props) {
    this.setState((state) => {
      return {
        sketch: new p5(( p5Context ) => eval(props.sketch(p5Context, node)), node)
      }
    });
  }

  update(props, oldProps) {
    //console.log('p5 props changed', props);

    /* added so we can manually resize the p5 sketch once its containing conditional becomes visible */
    if (props.resize !== oldProps.resize) {
      setTimeout(this.state.sketch.windowResized, 50); 
    }
    else {
      this.state.sketch.onUpdate(props, oldProps); 
    }

  }

}

module.exports = p5Component;
