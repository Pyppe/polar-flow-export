#!/usr/bin/env node

var _      = require('lodash');
var fs     = require('fs');
var uglify = require('uglify-js');

function jsWrap(js) {
  return 'javascript:(' + js + ');'
}

var minifiedCode = uglify.minify('app.js').code;
var lines = fs.readFileSync('README.md').toString().split(/\r?\n/);
var updatedReadMe = _.reduce(lines, function(acc, line) {
  if (line.indexOf('javascript:') === 0) {
    acc.push(jsWrap(minifiedCode));
  } else {
    acc.push(line);
  }
  return acc;
}, []).join('\n');

fs.writeFile('bookmarklet.js', jsWrap(minifiedCode));
fs.writeFile('README.md', updatedReadMe);
