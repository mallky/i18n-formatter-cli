const path = require('path');
const fs = require('fs');
import findProjectRoot from './findProjectRoot.js';

const maybeParse = (filePath, parse) =>
  filePath &&
  parse(filePath, {
    root: findProjectRoot(path.dirname(path.resolve(filePath))),
  });

const parseConfig = (filePath, { root }) => {
  const isConfigExist = fs.existsSync(`${root}/${filePath}`);
  if (!isConfigExist) {
    return console.error(
      'config file not found. You can try `i18n-cli init` to create config file'
    );
  }
  return require(`${root}/${filePath}`);
};

export const getConfig = (filePath) => maybeParse(filePath, parseConfig);
