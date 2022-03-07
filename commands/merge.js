import { getConfig } from '../utils/getConfig';
import { mergeObjects } from '../utils/files/mergeObjects.js';
const fs = require('fs');
const path = require('path');
const clc = require('cli-color');

export const merge = (fileName1, fileName2) => {
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

export const create = (fileName) => {
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
