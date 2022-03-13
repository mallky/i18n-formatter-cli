import clonedeep from 'lodash.clonedeep';

export const removeKey = (path: string[], obj: Record<string, any>) => {
  const tmpObj = clonedeep(obj);

  path.reduce<Record<string, any>>((acc, key, i) => {
    if (i === path.length - 1 && acc && acc[key]) {
      delete acc[key];
    }

    return acc[key];
  }, tmpObj);

  return tmpObj;
};
