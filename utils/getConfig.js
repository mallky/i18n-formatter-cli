const path = require('path');
const findProjectRoot = require('./findProjectRoot.js');

const maybeParse = (filePath, parse) =>
  filePath &&
  parse(filePath, {
    root: findProjectRoot(path.dirname(path.resolve(filePath))),
  });

const parseConfig = (filePath, { root }) => {
  return require(`${root}/${filePath}`);
};

const getConfig = (filePath) => maybeParse(filePath, parseConfig);

module.exports = {
  getConfig,
};
