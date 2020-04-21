const getCO2Level = (data, year) => data.filter(e => e.year == year)[0].ppm;
const getCO2Fraction = (data, year) => (getCO2Level(data, '2019') - getCO2Level(data, year)) / (getCO2Level(data, '2019') - 280);
const makeAnnotation = (data, year, annotationText, deltaX, deltaY) => ({
                          x: year,
                          y: getCO2Level(data, year) + 0.2,
                          xref: 'x',
                          yref: 'y',
                          text: annotationText,
                          showarrow: true,
                          arrowhead: 2,
                          ax: !isNaN(deltaX) ? deltaX : -25,
                          ay: !isNaN(deltaY) ? -deltaY : -100
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