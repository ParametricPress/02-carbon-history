const React = require('react');
const D3Component = require('idyll-d3-component');
const p5 = require('p5');

class p5Component extends D3Component {
  initialize(node, props) {
    const sketch = ( p ) => {

      let x = 100;
      let y = 100;

      p.setup = () => {
        p.createCanvas(400, 400);
        p.background('pink');
        p.textAlign(p.CENTER, p.CENTER);
        p.text('p5 hooray!', 200, 200);
        p.noLoop();
      };

      p.draw = () => {
      };


    };

    let myp5 = new p5(sketch, node);

  }

  update(props, oldProps) {
    //console.log('Updating component properties', props, oldProps);

  }
}

module.exports = p5Component;
