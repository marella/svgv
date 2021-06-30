const { transform } = require('../src/index.js');
const { fixture, fixtures } = require('./utils.js');

beforeAll(() => {
  jest.spyOn(process, 'cwd').mockReturnValue(fixtures);
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('optimize', () => {
  it('should use default config file', async () => {
    const result = await transform(await fixture('raw.svg'));
    expect(result).toMatchSnapshot('result');

    for (const configFile of [undefined, null]) {
      const svgo = { configFile };
      const actual = await transform(await fixture('raw.svg'), { svgo });
      expect(actual).toEqual(result);
    }
  });

  it('should not use default config file', async () => {
    const svgo = { configFile: false };
    const result = await transform(await fixture('raw.svg'), { svgo });
    expect(result).toMatchSnapshot('result');
  });

  it('should use custom config file', async () => {
    const svgo = { configFile: 'foo.config.js' };
    const result = await transform(await fixture('raw.svg'), { svgo });
    expect(result).toMatchSnapshot('result');
  });

  it('should throw error for non-existent config file', async () => {
    const svgo = { configFile: 'non-existent.config.js' };
    const result = transform(await fixture('raw.svg'), { svgo });
    await expect(result).rejects.toThrow();
  });
});
