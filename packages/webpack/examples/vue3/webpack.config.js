const VueLoaderPlugin = require('vue-loader/dist/plugin.js').default;

module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: ['vue-loader', '@svgv/webpack', 'url-loader'],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
