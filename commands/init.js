import findProjectRoot from '../utils/findProjectRoot';
const path = require('path');
const fs = require('fs');
const clc = require('cli-color');

const DEFAULT_STRUCTURE = `module.exports = {
  localesDir: './locales',
  mainLocale: 'en-gb.json',
  localeToMerge: './translation/externalTranslation.json'
}`;

export const init = () => {
  const pathFile = findProjectRoot(path.dirname(path.resolve('.i18nfnrc.js')));

  const isFileExist = fs.existsSync(pathFile + '/.i18nfnrc.js');

  if (isFileExist) {
    return console.log(clc.red('File .i18nfnrc.js already exists'));
  }

  fs.writeFile(pathFile + '/.i18nfnrc.js', DEFAULT_STRUCTURE, (err, res) => {
    if (err) {
      throw new Error(err);
    }
    console.log(clc.blue('File .i18nfnrc.js is created!'));
  });
};
