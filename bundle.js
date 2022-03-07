#!/usr/bin/env node
'use strict';

var commander = require('commander');

// Simple version of `find-project-root`
// https://github.com/kirstein/find-project-root/blob/master/index.js

const fs$4 = require('fs');
const path$4 = require('path');

const MARKERS = ['.git', '.hg'];

const markerExists = (directory) =>
  MARKERS.some((mark) => fs$4.existsSync(path$4.join(directory, mark)));

function findProjectRoot(directory) {
  while (!markerExists(directory)) {
    const parentDirectory = path$4.resolve(directory, '..');
    if (parentDirectory === directory) {
      break;
    }
    directory = parentDirectory;
  }

  return directory;
}

const CONFIG_FILE_NAME = '.i18nfnrc.js';

const path$3 = require('path');
const fs$3 = require('fs');

const maybeParse = (filePath, parse) =>
  filePath &&
  parse(filePath, {
    root: findProjectRoot(path$3.dirname(path$3.resolve(filePath))),
  });

const parseConfig = (filePath, { root }) => {
  const isConfigExist = fs$3.existsSync(`${root}/${filePath}`);
  if (!isConfigExist) {
    return console.log(
      'config file not found. You can try run `i18n-cli init` to create config file'
    );
  }

  const localConfig = require(`${root}/${filePath}`);
  if (!localConfig) {
    return console.log(
      'config data is undefined. Please verify that you create config file with correct name'
    );
  }

  if (!localConfig.localesDir) {
    return console.log(
      '`localesDir` is undefined. Please verify that you create `localesDir` field'
    );
  }

  let localeToMergeFile = null;

  if (localConfig?.localeToMerge) {
    localeToMergeFile = fs$3.readFileSync(
      path$3.join(...[root, localConfig.localeToMerge]),
      'utf-8'
    );
  }

  const localeFileNames = fs$3.readdirSync(
    path$3.join(...[root, localConfig.localesDir])
  );

  if (!localeFileNames || localeFileNames.length === 0) {
    return console.log("Didn't find any locales. Please add locales first");
  }

  const filteredFileNames = localeFileNames.filter(
    (name) => name !== localConfig?.localeToMerge
  );

  const localeFiles = {};

  filteredFileNames.forEach((fileName) => {
    localeFiles[fileName] = fs$3.readFileSync(
      path$3.join(...[root, localConfig.localesDir, fileName]),
      'utf-8'
    );
  });

  return {
    ...localConfig,
    localeFileNames: filteredFileNames,
    localeFiles,
    localeToMergeFile,
    root,
  };
};

const getConfig = (filePath = CONFIG_FILE_NAME) =>
  maybeParse(filePath, parseConfig);

const addKeys = (standard, b) => {
  const keys = Object.keys(standard);
  const tmp = {};

  keys.forEach((key) => {
    const value = standard[key];

    if (!b[key]) {
      tmp[key] = value;
    } else {
      const standardType =
        typeof standard[key] === 'string' ? 'string' : 'object';
      const bType = typeof b[key] === 'string' ? 'string' : 'object';

      if (standardType === 'string' && bType === 'string') {
        tmp[key] = b[key];
      } else if (standardType !== bType) {
        tmp[key] = value;
      } else {
        tmp[key] = addKeys(standard[key], b[key]);
      }
    }
  });

  return tmp;
};

const addAllKeysToObject = (mainLocale, localeFiles) => {
  const getMainLocaleDataString = localeFiles[mainLocale];
  const mainLocaleObject = JSON.parse(getMainLocaleDataString);

  return Object.entries(localeFiles).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]:
        key === mainLocale
          ? value
          : JSON.stringify(addKeys(mainLocaleObject, JSON.parse(value))),
    };
  }, {});
};

const fs$2 = require('fs');
const path$2 = require('path');
const clc$3 = require('cli-color');

const addAllKeys = () => {
  const config = getConfig();

  if (!config) {
    return;
  }

  const { localesDir, mainLocale, localeFiles, root } = config;

  const updatedLocaleFiles = addAllKeysToObject(mainLocale, localeFiles);

  Object.entries(updatedLocaleFiles).forEach(([key, value]) => {
    fs$2.writeFile(path$2.join(...[root, localesDir, key]), value, (err) => {
      if (err) {
        return console.log(err);
      }

      console.log(clc$3.blue(`Keys successfuly added to ${key} locale`));
    });
  });
  return config;
};

const path$1 = require('path');
const fs$1 = require('fs');
const clc$2 = require('cli-color');

const DEFAULT_STRUCTURE = `module.exports = {
  localesDir: './mocks',
  mainLocale: 'en-gb.json',
  localeToMerge: 'externalTranslation.json'
}`;

const init = () => {
  const pathFile = findProjectRoot(path$1.dirname(path$1.resolve('.i18nfnrc.js')));

  const isFileExist = fs$1.existsSync(pathFile + '/.i18nfnrc.js');

  if (isFileExist) {
    return console.log(clc$2.red('File .i18nfnrc.js already exists'));
  }

  fs$1.writeFileSync(
    pathFile + '/.i18nfnrc.js',
    DEFAULT_STRUCTURE,
    (err, res) => {
      if (err) {
        throw new Error(err);
      }
      console.log(clc$2.blue('File .i18nfnrc.js is created!'));
    }
  );
};

const clc$1 = require('cli-color');

const merge$1 = (obj, objToMerge, keyTrace = '') => {
  const keys = Object.keys(obj);

  if (!objToMerge) {
    objToMerge = {};
  }

  keys.forEach((key) => {
    const value = obj[key];

    if (!objToMerge[key]) {
      objToMerge[key] = value;
    } else {
      const objType = typeof obj[key] === 'string' ? 'string' : 'object';
      const bType = typeof objToMerge[key] === 'string' ? 'string' : 'object';

      if (objType === 'string' && bType === 'string') {
        objToMerge[key] = obj[key];
      } else if (objType !== bType) {
        console.log(
          clc$1.bold.red(
            `Types of ${keyTrace}.${key} fields are defferent. Please merge this conflict manually.`
          )
        );
      } else {
        objToMerge[key] = {
          ...objToMerge[key],
          ...merge$1(obj[key], objToMerge[key], `${keyTrace}.${key}`),
        };
      }
    }
  });

  return objToMerge;
};

const mergeObjects = (fileFromWhichToMerge, fileToMerge) => {
  if (!fileToMerge) {
    return fileFromWhichToMerge;
  }

  const fileFromWhichToMergeObj = JSON.parse(fileFromWhichToMerge);
  const fileToMergeObj = fileToMerge ? JSON.parse(fileToMerge) : null;

  return JSON.stringify(merge$1(fileFromWhichToMergeObj, fileToMergeObj));
};

const fs = require('fs');
const path = require('path');
const clc = require('cli-color');

const merge = (fileName1, fileName2) => {
  const config = getConfig();

  if (!config) {
    return;
  }

  const { localesDir, localeToMerge, localeFiles, localeToMergeFile, root } =
    config;

  if (!localeFiles[fileName2] && !localeToMergeFile) {
    return console.log(
      clc.red(
        `File ${fileName2} is not found. Please create ${fileName2} first or add path to 'localeToMerge' in config file`
      )
    );
  }

  const updatedData = mergeObjects(
    localeFiles[fileName2] || localeToMergeFile,
    localeFiles[fileName1]
  );

  fs.writeFile(
    path.join(...[root, localesDir, fileName1]),
    updatedData,
    (err) => {
      if (err) {
        return console.log(err);
      }

      console.log(
        clc.blue(
          `Keys from ${
            fileName2 || localeToMerge
          } is successfuly added to ${fileName1}`
        )
      );
    }
  );
};

const create = (fileName) => {
  const config = getConfig();

  if (!config) {
    return;
  }

  const { localesDir, mainLocale, localeFiles, root } = config;

  if (!localeFiles[mainLocale]) {
    return console.log(
      clc.red(
        `File ${mainLocale} is not found. Please create ${mainLocale} first or add path to 'mainLocale' in config file`
      )
    );
  }

  const updatedData = mergeObjects(localeFiles[mainLocale]);

  fs.writeFile(
    path.join(...[root, localesDir, fileName]),
    updatedData,
    (err) => {
      if (err) {
        return console.log(err);
      }

      console.log(
        clc.blue(`Keys from ${mainLocale} is successfuly added to ${fileName}`)
      );
    }
  );
};

commander.program.command('init').description('Init .i18nfnrc.js file').action(init);
commander.program
  .command('create <fileName>')
  .description(
    'Create new file `fileName` with all the same keys as in mainLocale file'
  )
  .action(create);

commander.program
  .command('addAllKeys')
  .description(
    'Add all keys from main translation file to all the others files'
  )
  .action(addAllKeys);

commander.program
  .command('merge <fileName1> [fileName2]')
  .description(
    "Merge `fileName2` file keys to `fileName1`. If `fileName1` doesn't exist it will be created with all keys from `fileName2`. `fileName2` is `localeToMerge` file by default."
  )
  .action(merge);

commander.program.parse();
