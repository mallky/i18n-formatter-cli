import { IConfig } from '../types';
import clonedeep from 'lodash.clonedeep';

export const get = (
  obj: Record<string, any>,
  path: string[],
  defValue = ''
) => {
  if (!path) return undefined;

  const result = path.reduce((prevObj, key) => prevObj && prevObj[key], {
    ...obj,
  });

  return result === undefined ? defValue : result;
};

export const getLine = (
  obj: Record<string, any>,
  path: string[],
  defValue = ''
) => {
  return {
    key: path[path.length - 1],
    value: get(obj, path, defValue),
  };
};

const NEW_KEY = 'newKey';
const NEW_VALUE = 'newValue';

const createNew = (type: IConfig['type']) =>
  type === 'line'
    ? { [`${NEW_KEY}_${type}`]: NEW_VALUE }
    : {
        [`${NEW_KEY}_${type}`]: {
          [NEW_VALUE]: NEW_VALUE,
        },
      };

export const set = (
  obj: Record<string, any>,
  path: string[],
  value = '',
  config: IConfig = { isKey: false, addNew: false, type: 'line' }
) => {
  if (!value && !config.addNew) {
    return obj;
  }

  if (config.addNew && path.length === 0) {
    return { ...obj, ...createNew(config.type) };
  }

  const tmpObj = clonedeep(obj);

  path.reduce((acc, key, i) => {
    if (acc[key] === undefined) {
      acc[key] = {};
    }

    if (i === path.length - 1) {
      if (config.addNew) {
        acc[key] = {
          ...acc[key],
          ...createNew(config.type),
        };
      } else if (!config.isKey) {
        acc[key] = value;
      } else {
        if (value !== key) {
          acc[value] =
            typeof acc[key] === 'object' ? { ...acc[key] } : acc[key];
          delete acc[key];
        }
      }
    }

    return acc[key];
  }, tmpObj);

  return tmpObj;
};
