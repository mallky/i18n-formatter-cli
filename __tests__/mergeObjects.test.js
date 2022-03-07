import { merge } from '../utils/files/mergeObjects';

jest.mock('cli-color', () => ({ bold: { red: (value) => value } }));

const testToMerge = {
  header: {
    title: 'external-this is new header',
    subheader: {
      label: 'external-label',
    },
  },
  footer: {
    title: 'external-footer title',
    subTitle: 'external-subtitle',
  },
};

const testObj1 = {
  header: {
    title: 'title',
    subheader: {
      label: 'label',
      sub: 'sub',
    },
  },
  footer: {
    title: 'title',
  },
  main: {
    title: 'title',
  },
  aside: {
    title: 'title',
  },
};

const testObj2 = {
  header: {
    title: {
      strong: 'title',
      verySAtrong: 'title',
    },
    subheader: {
      label: 'rus-label',
      sub: 'rus-sub',
    },
  },
};

describe('merge function testing', () => {
  test('should return testObj as it is', () => {
    expect(merge(testToMerge)).toEqual(testToMerge);
  });
  test('should return merged testObj1', () => {
    expect(merge(testToMerge, testObj1)).toEqual({
      header: {
        title: 'external-this is new header',
        subheader: {
          label: 'external-label',
          sub: 'sub',
        },
      },
      footer: {
        title: 'external-footer title',
        subTitle: 'external-subtitle',
      },
      main: {
        title: 'title',
      },
      aside: {
        title: 'title',
      },
    });
  });

  test('should return merged testObj2', () => {
    expect(merge(testToMerge, testObj2)).toEqual({
      ...testToMerge,
      header: {
        ...testToMerge.header,
        title: {
          strong: 'title',
          verySAtrong: 'title',
        },
        subheader: {
          label: testToMerge.header.subheader.label,
          sub: 'rus-sub',
        },
      },
    });
  });
});
