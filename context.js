const getCO2Level = (data, year) => data.filter(e => e.year == year)[0].ppm;
const getCO2Fraction = (data, year) => (getCO2Level(data, '2019') - getCO2Level(data, year)) / (getCO2Level(data, '2019') - 280);
const map = (n, start1, stop1, start2, stop2) => Math.min(Math.max((n - start1) / (stop1 - start1) * (stop2 - start2) + start2, start2),stop2);
const makeAnnotation = (data, graphYear, year, scale, direction, annotationText, deltaX, deltaY, xAnchor, yAnchor, isLabelStatic = false) => (
                        {
                          x: year,
                          y: getCO2Level(data, year),
                          direction: direction,
                          xref: 'x',
                          yref: 'y',
                          xanchor: xAnchor ? xAnchor : 'center',
                          yanchor: yAnchor ? yAnchor : (direction == 'up' ? 'bottom' : 'top'),
                          text: annotationText,
                          font: {
                            size: (isLabelStatic ? 12 : 12 * Math.pow((2020 - year)/(2020 - graphYear), 0.5)) * scale,
                          },
                          showarrow: true,
                          arrowhead: 2 * scale,
                          arrowwidth: 2 * scale,
                          ax: (!isNaN(deltaX) ? deltaX : -25 ) * (isLabelStatic ? 1 : Math.pow((2020 - year)/(2020 - graphYear), 0.5)) * (direction == 'up' ? 1 : -0.5) * scale,
                          ay: (!isNaN(deltaY) ? -deltaY : -40) * (isLabelStatic ? 1 : Math.pow((2020 - year)/(2020 - graphYear), 0.5)) * (direction == 'up' ? 1 : -0.5) * scale
                        });

module.exports = (ctx) => {

  // The context has loaded,
  // initial data is available
  ctx.onInitialize(() => {
    const initialState = ctx.data();

    // Once the context has been initialized,
    // you can use the ctx.update() method
    // to modify data.
    //
    // Here I'm going to inject some function that we can use in the
    // browser
    ctx.update({
       getCO2Level: getCO2Level,
       getCO2Fraction: getCO2Fraction,
       makeAnnotation: makeAnnotation
    });

  })

  // The application has mounted in the browser,
  // the window object is available
  ctx.onMount(() => {

  })

  // An update has been triggered,
  // arguments contain only modified data
  ctx.onUpdate((newData) => {

  })

}