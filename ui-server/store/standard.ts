import { atom, selector } from 'recoil';
import { filesState } from './files';

export const standardState = atom<string | null>({
  key: 'standardState',
  default: null,
});

export const standardFileObjSelector = selector({
  key: 'standardFileObjSelector',
  get: ({ get }) => {
    const files = get(filesState);
    const name = get(standardState);
    return name && files[name] ? files[name].text : null;
  },
});
