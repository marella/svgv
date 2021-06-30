const { optimize, loadConfig, extendDefaultPlugins } = require('svgo');

// These plugins are required to remove tags that are not allowed in component templates.
const plugins = [
  'removeXMLProcInst', // Removes <?xml?>
  'removeDoctype', // Removes <!DOCTYPE>
  'removeScriptElement', // Removes <script>
  'inlineStyles', // Inlines styles from <style>
  'minifyStyles', // Removes unused styles in <style>
  'mergeStyles', // Removes empty <style>
];

const defaults = {
  multipass: true,
  plugins: extendDefaultPlugins([
    // Converting styles such as style="enable-background:new 0 0 24 24", style="fill:none" to attributes
    // allows plugins such as cleanupEnableBackground, removeUselessStrokeAndFill to do further processing
    // and also allows overriding styles such as fill via attributes.
    'convertStyleToAttrs',
    {
      name: 'removeViewBox',
      active: false,
    },
  ]),
};

/**
 * @see https://github.com/svg/svgo-loader/blob/master/index.js
 */
module.exports = async (svg, { configFile, ...options }) => {
  let config;
  if (typeof configFile === 'string') {
    config = await loadConfig(configFile);
  } else if (configFile !== false) {
    config = await loadConfig(null);
  }
  config = { ...defaults, ...config, ...options };
  config.plugins = (config.plugins || []).concat(plugins);
  const result = optimize(svg, config);
  if (result.error) {
    throw new Error(result.error);
  }
  return result.data;
};
