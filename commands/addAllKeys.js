import { getConfig } from '../utils/getConfig';
import addAllKeysToObject from '../utils/files/addAllKeysToObject';
const fs = require('fs');
const path = require('path');
const clc = require('cli-color');

export const addAllKeys = () => {
  const config = getConfig();

  if (!config) {
    return;
  }

  const { localesDir, mainLocale, localeFiles, root } = config;

  const updatedLocaleFiles = addAllKeysToObject(mainLocale, localeFiles);

  Object.entries(updatedLocaleFiles).forEach(([key, value]) => {
    fs.writeFile(path.join(...[root, localesDir, key]), value, (err) => {
      if (err) {
        return console.log(err);
      }

      console.log(clc.blue(`Keys successfuly added to ${key} locale`));
    });
  });
  return config;
};
