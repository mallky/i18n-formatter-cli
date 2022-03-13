import { SEPARATOR } from '../constants';
import { Item } from '../types';

export const parseObj = (obj: Record<string, any>, prevKey: string = '') => {
  const arr: Item[] = [];

  for (const key in obj) {
    const id = prevKey.concat(`${SEPARATOR}${key}`);
    const hasNestedObject = typeof obj[key] === 'object';

    const value = hasNestedObject
      ? parseObj(obj[key], id)
      : [
          {
            id,
            text: String(obj[key]),
            config: { isKey: false },
          },
        ];

    const item = {
      id,
      config: { isKey: true, addNew: hasNestedObject },
      text: key,
      value,
    };

    arr.push(item);
  }

  return arr;
};
