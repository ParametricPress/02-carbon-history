const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const sizeX = 600;
const sizeY = 400;

class CustomD3Component extends D3Component {
  initialize(node, props) {
    console.log('Initializing custom D3 component. This component requires that the author is responsible for updating the DOM as properties change.');
    const svg = (this.svg = d3.select(node).append('svg'));
    svg
      .attr('viewBox', `0 0 ${sizeX} ${sizeY}`)
      .style('width', '100%')
      .style('height', 'auto');

    svg
      .append('circle')
      .attr('r', 20)
      .attr('cx', Math.random() * sizeX)
      .attr('cy', Math.random() * sizeY);
  }

  update(props, oldProps) {
    console.log('Updating component properties', props, oldProps);
    this.svg
      .selectAll('circle')
      .transition()
      .duration(750)
      .attr('cx', Math.random() * sizeX)
      .attr('cy', Math.random() * sizeY);
  }
}

module.exports = CustomD3Component;
