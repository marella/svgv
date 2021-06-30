const { callbackify, promisify } = require('util');
const { getOptions } = require('loader-utils');
const { transform, getDefaultExport } = require('@svgv/core');

async function loader(content) {
  const options = getOptions(this);
  const defaultExport = getDefaultExport(content);
  if (defaultExport) {
    const readFile = promisify(this.fs.readFile.bind(this.fs));
    content = await readFile(this.resourcePath);
  }
  return transform(content, options, {
    path: this.resourcePath,
    defaultExport,
  });
}

module.exports = function (content) {
  const callback = this.async();
  const loaderAsync = callbackify(loader.bind(this));
  loaderAsync(content, callback);
};
