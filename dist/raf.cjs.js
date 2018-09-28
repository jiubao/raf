'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// for a 60Hz monitor, requestAnimationFrame will trigger the callback every 16.67ms (1000 / 60 == 16.66...)
var vendorPrefixes = ['webkit','moz','ms','o'];
exports.raf = vendorPrefixes.reduce(function (result, next) { return result || window[(next + "RequestAnimationFrame")]; }, window.requestAnimationFrame).bind(window);
exports.caf = vendorPrefixes.reduce(function (result, next) { return result || window[(next + "CancelAnimationFrame")]; }, window.cancelAnimationFrame).bind(window);
if (!exports.raf || !exports.caf) {
  var last = 0;
  exports.raf = function (fn) {
    var now = +new Date();
    last = Math.max(now, last + 16);
    return setTimeout(fn, last - now)
  };
  exports.caf = clearTimeout;
}
