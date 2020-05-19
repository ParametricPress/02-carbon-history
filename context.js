const getCO2Level = (data, year) => data.filter(e => e.year == year)[0].ppm;
const interpolateCO2Level = (data, yearList, year) => {
  if (yearList.includes(year)) {
    return getCO2Level(data, year);
  } else {
    let prevYear = yearList.filter(y => y < year)[0]; // first element of years before
    let nextYear = yearList.filter(y => y > year).slice(-1)[0]; // last element of years after
    let prevPPM = getCO2Level(data, prevYear);
    let nextPPM = getCO2Level(data, nextYear);
    let interpolatedPPM = map(year, prevYear, nextYear, prevPPM, nextPPM);
    return interpolatedPPM;
  }
};
const getCO2Fraction = (data, year) => (getCO2Level(data, '2019') - getCO2Level(data, year)) / (getCO2Level(data, '2019') - 280);
const map = (n, start1, stop1, start2, stop2) => Math.min(Math.max((n - start1) / (stop1 - start1) * (stop2 - start2) + start2, start2),stop2);
const makeAnnotation = (data, graphYear, year, scale, direction, annotationText, deltaX, deltaY, xAnchor, yAnchor, isLabelStatic = false) => (
                        {
                          x: year,
                          y: getCO2Level(data, year), // this is super inefficient!
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
                          arrowhead: 2,
                          arrowwidth: 2 * scale,
                          ax: (!isNaN(deltaX) ? deltaX : -25 ) * (isLabelStatic ? 1 : Math.pow((2020 - year)/(2020 - graphYear), 0.5)) * (direction == 'up' ? 1 : -0.5) * scale,
                          ay: (!isNaN(deltaY) ? -deltaY : -40) * (isLabelStatic ? 1 : Math.pow((2020 - year)/(2020 - graphYear), 0.5)) * (direction == 'up' ? 1 : -0.5) * scale,
                          visible: isLabelStatic || 12 * Math.pow((2020 - year)/(2020 - graphYear), 0.5) >= 8
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
       makeAnnotation: makeAnnotation,
       map: map,
       interpolateCO2Level: interpolateCO2Level
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