const React = require('react');
const D3Component = require('idyll-d3-component');
const p5 = require('p5');
let p5sketch;

class p5Component extends D3Component {

  initialize(node, props) {

    const sketch = ( p ) => {

      let parent = node;

      p.setup = function() {
        p.createCanvas(600, 600);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(20);
      };

      p.draw = function() {
        p.circle(p.mouseX, p.mouseY, 50);
      };

      p.windowResized = function() {
        let newWidth = parent.offsetWidth
        p.resizeCanvas(newWidth, 600);
        p.background(p.random(255), p.random(255), p.random(255));
        p.text('I was updated!', p.width/2, p.height/2);
      };

      p.onUpdate = function(props, oldProps) {

        /* this is a hack to resize the p5 sketch once its containing conditional becomes visible */
        if (props.isVisible !== oldProps.isVisible) {

          setTimeout(function() {
            let newWidth = parent.offsetWidth
            p.resizeCanvas(newWidth, 600);
            p.background(p.random(255), p.random(255), p.random(255));
            p.text('I was updated!', p.width/2, p.height/2);
          }, 50);

        } else {

          p.background(p.random(255), p.random(255), p.random(255));
          p.text('I was updated!', p.width/2, p.height/2);

        }

      };

    };

    p5sketch = new p5(sketch, node);

  }

  update(props, oldProps) {
    p5sketch.onUpdate(props, oldProps);
  }

}

module.exports = p5Component;
