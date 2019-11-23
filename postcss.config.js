/* eslint-disable */
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const purgecss = require('@fullhuman/postcss-purgecss');

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

const plugins = [
  tailwindcss('./tailwind.config.js'),
  autoprefixer({
    // add: true,
    // grid: true,
  }),
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    purgecss({
      content: [
        './public/index.html',
        './src/**/*.vue',
      ],
      whitelistPatterns: [/^fa-/, /^fade-/, /^bm-/],
      extractors: [
        {
          extractor: TailwindExtractor,

          // Specify the file extensions to include when scanning for
          // class names.
          extensions: ["html", "js", "php", "vue"]
        }
      ]
    }),
  );
}

module.exports = {
  plugins,
};
