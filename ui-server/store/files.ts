import { atom, selector } from 'recoil';

export interface ParsedFile {
  text: Record<string, any> | null;
  name: string;
}

export const filesState = atom<Record<string, ParsedFile>>({
  key: 'filesState',
  default: {},
});

export const filesSelector = selector({
  key: 'filesSelector',
  get: ({ get }) => {
    return Object.values(get(filesState)) || [];
  },
});
