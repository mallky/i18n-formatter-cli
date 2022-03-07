const clc = require('cli-color');

export const merge = (obj, objToMerge, keyTrace = '') => {
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
          clc.bold.red(
            `Types of ${keyTrace}.${key} fields are defferent. Please merge this conflict manually.`
          )
        );
      } else {
        objToMerge[key] = {
          ...objToMerge[key],
          ...merge(obj[key], objToMerge[key], `${keyTrace}.${key}`),
        };
      }
    }
  });

  return objToMerge;
};

export const mergeObjects = (fileFromWhichToMerge, fileToMerge) => {
  if (!fileToMerge) {
    return fileFromWhichToMerge;
  }

  const fileFromWhichToMergeObj = JSON.parse(fileFromWhichToMerge);
  const fileToMergeObj = fileToMerge ? JSON.parse(fileToMerge) : null;

  return JSON.stringify(merge(fileFromWhichToMergeObj, fileToMergeObj));
};
