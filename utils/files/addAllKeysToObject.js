export const addKeys = (standard, b) => {
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

export default addAllKeysToObject;
