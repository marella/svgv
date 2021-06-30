const { readFile } = require('fs').promises; // Support node <= 12
const path = require('path');

const fixtures = path.join(__dirname, 'fixtures');

const fixture = async (file) => await readFile(path.join(fixtures, file));

module.exports = {
  fixture,
  fixtures,
};
