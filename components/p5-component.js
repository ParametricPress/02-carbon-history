const React = require('react');
const D3Component = require('idyll-d3-component');
const p5 = require('p5');
let p5sketch;

class p5Component extends D3Component {

  initialize(node, props) {
    p5sketch = new p5(( p5Context ) => eval(props.sketch(p5Context, node)), node);
  }

  update(props, oldProps) {
    //console.log('p5 props changed', props);
    p5sketch.onUpdate(props, oldProps);
  }

}

module.exports = p5Component;
