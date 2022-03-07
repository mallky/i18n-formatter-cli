import { addKeys } from '../utils/files/addAllKeysToObject';

const obj = {
  t1: {
    t2: {
      t3: {
        t4: '1',
        t5: '2',
        t6: {
          t7: {
            t8: '3',
            t9: '4',
          },
        },
      },
    },
  },
  g1: {
    g2: 'asd',
    g3: 'sad',
  },
};

const testObj = {
  g1: {
    g3: 'g3',
    g4: 'g4',
  },
};

describe('addKeys function', () => {
  test('should copy all keys from obj to empty file', () => {
    expect(addKeys(obj, {})).toEqual(obj);
  });
  test('should add all keys from obj to testObj and save g3 value as it was', () => {
    expect(addKeys(obj, testObj)).toEqual({
      ...obj,
      g1: { ...obj.g1, g3: 'g3' },
    });
  });
});
