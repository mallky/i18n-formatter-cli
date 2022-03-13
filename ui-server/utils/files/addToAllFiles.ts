import { ParsedFile } from '../../store/files';

const addKeys = (standard: Record<string, any>, b: Record<string, any>) => {
  const keys = Object.keys(standard);
  const tmp: Record<string, any> = {};

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

export const addToAllFiles = (
  files: Record<string, ParsedFile>,
  standardFileName: string
): Record<string, ParsedFile> => {
  const standardFileObj = files[standardFileName].text || {};

  const filesArr = Object.values(files).map((file) => ({
    ...file,
    value:
      file.name !== standardFileName
        ? addKeys(standardFileObj, file.text || {})
        : null,
  }));

  return filesArr.reduce<Record<string, ParsedFile>>(
    (acc, item) => ({
      ...acc,
      [item.name]: {
        name: item.name,
        text: item.name !== standardFileName ? item.value : item.text,
      },
    }),
    {}
  );
};
