var memoize = require("memoizee");

let myCO2LookupObj = {}; 
let years = [];

const getCO2Level = (year) => myCO2LookupObj[year];
const getCO2Fraction = (year) => (getCO2Level(2019) - getCO2Level(year)) / (getCO2Level(2019) - 280);

const interpolateCO2Level = (year) => {
  if (years.includes(Number(year))) {
    return myCO2LookupObj[year];
  }
  else {
    let prevYear = years.filter(y => y < year)[0]; // first element of years before
    let nextYear = years.filter(y => y > year).slice(-1)[0]; // last element of years after
    let prevPPM = myCO2LookupObj[prevYear];
    let nextPPM = myCO2LookupObj[nextYear];
    let interpolatedPPM = map(year, prevYear, nextYear, prevPPM, nextPPM);
    return interpolatedPPM;
  } 
};
const interpolateCO2LevelCached = memoize(interpolateCO2Level);

const makeAnnotation = (power, graphYear, year, scale, direction, annotationText, deltaX, deltaY, xAnchor, yAnchor, isLabelStatic = false) => (
                        {
                          x: year,
                          y: interpolateCO2LevelCached(year), // cached to improve efficiency on repeat lookups
                          direction: direction,
                          xref: 'x',
                          yref: 'y',
                          xanchor: xAnchor ? xAnchor : 'center',
                          yanchor: yAnchor ? yAnchor : (direction == 'up' ? 'bottom' : 'top'),
                          text: annotationText,
                          font: {
                            size: (isLabelStatic ? 12 : 12 * Math.pow((2020 - year)/(2020 - graphYear), power)) * scale,
                          },
                          showarrow: true,
                          arrowhead: 2,
                          arrowwidth: 2 * scale,
                          ax: (!isNaN(deltaX) ? deltaX : -25 ) * (isLabelStatic ? 1 : Math.pow((2020 - year)/(2020 - graphYear), power)) * (direction == 'up' ? 1 : -0.5) * scale,
                          ay: (!isNaN(deltaY) ? -deltaY : -40) * (isLabelStatic ? 1 : Math.pow((2020 - year)/(2020 - graphYear), power)) * (direction == 'up' ? 1 : -0.5) * scale,
                        });

// map & constrain function from p5.js library 
// https://github.com/processing/p5.js/blob/master/src/math/calculation.js

const map = function(n, start1, stop1, start2, stop2, withinBounds) {
  const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
  if (!withinBounds) {
    return newval;
  }
  if (start2 < stop2) {
    return constrain(newval, start2, stop2);
  } else {
    return constrain(newval, stop2, start2);
  }
};

const constrain = function(n, low, high) {
  return Math.max(Math.min(n, high), low);
};

module.exports = (ctx) => {

  // The context has loaded,
  // initial data is available
  ctx.onInitialize(() => {
    const initialState = ctx.data();
    
    initialState.co2.forEach(e => {
      myCO2LookupObj[e.year] = e.ppm
    });

    years = initialState.co2.map(e => Number(e.year)).sort((a,b) => b - a);
    // Once the context has been initialized,
    // you can use the ctx.update() method
    // to modify data.
    //
    // Here I'm going to inject some function that we can use in the
    // browser
    ctx.update({
       myCO2LookupObj: myCO2LookupObj,
       years: years,
       getCO2Level: getCO2Level,
       getCO2Fraction: getCO2Fraction,
       makeAnnotation: makeAnnotation,
       map: map,
       constrain: constrain,
       interpolateCO2Level: interpolateCO2Level,
       interpolateCO2LevelCached: interpolateCO2LevelCached
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