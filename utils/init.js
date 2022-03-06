import findProjectRoot from './findProjectRoot.js';
const path = require('path');
const fs = require('fs');

const DEFAULT_STRUCTURE = `module.exports = {
  translationsDir: './mocks',
  mainTranslation: './mocks/en-gb.json'
}`;

export const init = () => {
  const pathFile = findProjectRoot(path.dirname(path.resolve('.i18nfnrc.js')));

  const isFileExist = fs.existsSync(pathFile + '/.i18nfnrc.js');

  if (isFileExist) {
    return chalk.red.bold('file .i18nfnrc.js already exists');
  }

  fs.writeFileSync(
    pathFile + '/.i18nfnrc.js',
    DEFAULT_STRUCTURE,
    (err, res) => {
      if (err) {
        throw new Error(err);
      }
      console.log(res);
    }
  );
};
