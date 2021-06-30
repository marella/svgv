const { transform } = require('../src/index.js');
const { fixture } = require('./utils.js');

const paths = [undefined, null, '', 'foo/bar.svg'];
const defaultExports = [undefined, null, '', '"foo"', 'foo + "bar"'];

describe('transform', () => {
  it('should transform svg', async () => {
    const result = await transform(await fixture('raw.svg'));
    expect(result).toMatchSnapshot('result');

    for (const path of paths) {
      const actual = await transform(await fixture('raw.svg'), undefined, {
        path,
      });
      expect(actual).toEqual(result);
    }
  });

  it.each(defaultExports)(
    "should transform svg { defaultExport: '%s' }",
    async (defaultExport) => {
      const result = await transform(await fixture('raw.svg'), undefined, {
        defaultExport,
      });
      expect(result).toMatchSnapshot('result');

      for (const path of paths) {
        const actual = await transform(await fixture('raw.svg'), undefined, {
          path,
          defaultExport,
        });
        expect(actual).toEqual(result);
      }
    }
  );

  it('should throw error for invalid svg', async () => {
    await expect(transform(await fixture('invalid.svg'))).rejects.toThrow();
  });
});

describe('optimize', () => {
  it('should not optimize', async () => {
    const result = await transform(await fixture('raw.svg'), {
      svgo: false,
    });
    expect(result).toMatchSnapshot('result');
  });

  it('should allow options', async () => {
    const result = await transform(await fixture('raw.svg'), {
      svgo: {
        js2svg: {
          pretty: true,
          indent: 4,
        },
      },
    });
    expect(result).toMatchSnapshot('result');
  });

  it('should allow plugins', async () => {
    let result = await transform(await fixture('raw.svg'), {
      svgo: {
        plugins: ['removeViewBox'],
      },
    });
    expect(result).toMatchSnapshot('removeViewBox');

    result = await transform(await fixture('raw.svg'), {
      svgo: {
        plugins: null,
      },
    });
    expect(result).toMatchSnapshot('null');
  });
});
