const optimize = require('./optimize.js');

module.exports = async (svg, { svgo } = {}, { path, defaultExport } = {}) => {
  if (svgo !== false) {
    // `svgo` is used to remove tags that are not allowed in component templates.
    svg = await optimize(svg, { path, ...svgo });
  }
  const template = `<template>${svg}</template>\n`;

  // `String` object is exported as `vue-loader` sets `render()` function
  // on default export which doesn't work with primitive strings.
  const script = defaultExport
    ? `<script>export default new String(${defaultExport});</script>\n`
    : '';

  return template + script;
};
