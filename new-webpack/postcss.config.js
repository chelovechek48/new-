const AutoPrefixer = require('autoprefixer');
const SortMediaQueries = require('postcss-sort-media-queries');

module.exports = {
  plugins: [
    AutoPrefixer,
    SortMediaQueries,
  ],
};
