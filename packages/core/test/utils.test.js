const { getDefaultExport } = require('../src/index.js');

describe('getDefaultExport', () => {
  const inputs = ['foo', '"foo"', '1', 'a + "b"', '{ a: 1, b: "c" }'];

  it.each(inputs)('should get default export: es', (input) => {
    let actual = getDefaultExport(`export default ${input}`);
    expect(actual).toEqual(input);

    actual = getDefaultExport(`export default ${input};`);
    expect(actual).toEqual(input);

    actual = getDefaultExport(`  export  default  ${input}  ;  `);
    expect(actual).toEqual(input);
  });

  it.each(inputs)('should get default export: cjs', (input) => {
    let actual = getDefaultExport(`module.exports = ${input}`);
    expect(actual).toEqual(input);

    actual = getDefaultExport(`module.exports = ${input};`);
    expect(actual).toEqual(input);

    actual = getDefaultExport(`  module.exports  =  ${input}  ;  `);
    expect(actual).toEqual(input);

    actual = getDefaultExport(`module.exports=${input}`);
    expect(actual).toEqual(input);

    actual = getDefaultExport(`module.exports=${input};`);
    expect(actual).toEqual(input);
  });
});
