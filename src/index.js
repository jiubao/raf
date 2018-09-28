// for a 60Hz monitor, requestAnimationFrame will trigger the callback every 16.67ms (1000 / 60 == 16.66...)
var vendorPrefixes = ['webkit','moz','ms','o']
var raf = vendorPrefixes.reduce((result, next) => result || window[`${next}RequestAnimationFrame`], window.requestAnimationFrame).bind(window)
var caf = vendorPrefixes.reduce((result, next) => result || window[`${next}CancelAnimationFrame`], window.cancelAnimationFrame).bind(window)
if (!raf || !caf) {
  var last = 0;
  raf = fn => {
    var now = +new Date();
    last = Math.max(now, last + 16);
    return setTimeout(fn, last - now)
  }
  caf = clearTimeout
}

export {raf, caf}
