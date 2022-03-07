const path = require('path');
const fs = require('fs');
import findProjectRoot from './findProjectRoot.js';
import { CONFIG_FILE_NAME } from './constants/index';

const maybeParse = (filePath, parse) =>
  filePath &&
  parse(filePath, {
    root: findProjectRoot(path.dirname(path.resolve(filePath))),
  });

const parseConfig = (filePath, { root }) => {
  const isConfigExist = fs.existsSync(`${root}/${filePath}`);
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
    localeToMergeFile = fs.readFileSync(
      path.join(...[root, localConfig.localeToMerge]),
      'utf-8'
    );
  }

  const localeFileNames = fs.readdirSync(
    path.join(...[root, localConfig.localesDir])
  );

  if (!localeFileNames || localeFileNames.length === 0) {
    return console.log("Didn't find any locales. Please add locales first");
  }

  const filteredFileNames = localeFileNames.filter(
    (name) => name !== localConfig?.localeToMerge
  );

  const localeFiles = {};

  filteredFileNames.forEach((fileName) => {
    localeFiles[fileName] = fs.readFileSync(
      path.join(...[root, localConfig.localesDir, fileName]),
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

export const getConfig = (filePath = CONFIG_FILE_NAME) =>
  maybeParse(filePath, parseConfig);
