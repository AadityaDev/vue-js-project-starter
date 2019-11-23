module.exports = {
  pwa: {
    name: 'Pulse',
    appleMobileWebAppCapable: 'yes',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      globPatterns: ['**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff,woff2}'],
      maximumFileSizeToCacheInBytes: 20 * 1024 * 1024, // Increase max file caching size to 20 MB
      swSrc: 'src/service-worker.js',
      exclude: [
        /\.map$/,
        /manifest\.json$/,
      ],
    },
    themeColor: '#FF545E',
  },
  devServer: {
    port: 4000,
  },
  outputDir: 'www',
  css: {
    sourceMap: true,
  },
  lintOnSave: false,
};
