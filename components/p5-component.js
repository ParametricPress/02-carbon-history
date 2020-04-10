const React = require('react');
const p5 = require('p5');
let p5sketch;

class p5Component extends React.Component {

  initialize(node, props) {

    const sketch = ( p ) => {

      p.setup = function() {
        p.createCanvas(600, 600);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(20);
      };

      p.draw = function() {
        p.circle(p.mouseX, p.mouseY, 50);
      };

      p.onResize = function() {
      }

      p.onUpdate = function(props, oldProps) {

        /* this is a hack to resize the p5 sketch once its containing conditional becomes visible */
        if (props.isVisible !== oldProps.isVisible) {

          setTimeout(function() {
            let newWidth = document.getElementById('firstsketch').offsetWidth
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

  componentWillReceiveProps(newProps) {
    p5sketch.onUpdate(newProps, this.props);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { className, id, style } = this.props;
    return (
      <div ref={(node) => { this.initialize(node, this.props) }} className={className} id={id} style={Object.assign({ width: '100%'}, style)} />
    );
  }

}

module.exports = p5Component;
