const path = require('path');
const { compile, CompileError } = require('./utils.js');

const loader = path.resolve(__dirname, '../src/index.js');

describe('loader', () => {
  it('should transform svg', async () => {
    const result = await compile('raw.svg', ['vue-loader', loader]);
    expect(result.join('\n\n---\n\n')).toMatchSnapshot('result');
  }, 15000);

  it('should allow options', async () => {
    let result = await compile('raw.svg', [
      'vue-loader',
      {
        loader,
        options: {
          svgo: {
            plugins: ['removeViewBox'],
          },
        },
      },
    ]);
    expect(result.join('\n\n---\n\n')).toMatchSnapshot('removeViewBox');

    result = await compile('raw.svg', [
      'vue-loader',
      {
        loader,
        options: {
          svgo: {
            plugins: null,
          },
        },
      },
    ]);
    expect(result.join('\n\n---\n\n')).toMatchSnapshot('null');
  }, 15000);

  it('should support url-loader', async () => {
    const result = await compile('raw.svg', [
      'vue-loader',
      loader,
      'url-loader',
    ]);
    expect(result.join('\n\n---\n\n')).toMatchSnapshot('result');
  }, 15000);

  it('should support file-loader', async () => {
    const result = await compile('raw.svg', [
      'vue-loader',
      loader,
      'file-loader',
    ]);
    expect(result.join('\n\n---\n\n')).toMatchSnapshot('result');
  }, 15000);

  it('should throw compile error', async () => {
    await expect(
      compile('invalid.svg', ['vue-loader', loader])
    ).rejects.toThrow(CompileError);
  }, 15000);
});
