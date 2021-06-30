const VueLoaderPlugin = require('vue-loader/lib/plugin.js');

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
