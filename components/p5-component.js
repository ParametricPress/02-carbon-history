const React = require('react');
const D3Component = require('idyll-d3-component');
const p5 = require('p5');
let p5sketch;

class p5Component extends D3Component {
  initialize(node, props) {
    const sketch = ( p ) => {

      let x = 100;
      let y = 100;

      p.setup = () => {
        p.createCanvas(600, 600);
        p.background('pink');
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(20);
        p.text('p5 hooray!', p.width/2, p.height/2);
        p.noLoop();
      };

      p.draw = () => {
      };

      p.onUpdate = function(props, oldProps) {
        p.background(p.random(255), p.random(255), p.random(255));
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(20);
        p.text('I was updated!', p.width/2, p.height/2);
        p.noLoop();
      };


    };

    p5sketch = new p5(sketch, node);

    //console.log(node);
    //console.log(props);

  }

  update(props, oldProps) {
    //console.log('Updating component properties', props, oldProps);
    p5sketch.onUpdate(props, oldProps);

  }
}

module.exports = p5Component;
