import { ParsedFile } from '../../store/files';
import { set } from './pureLodash';
import { IConfig } from '../types';

export const setNewValue = (
  files: Record<string, ParsedFile>,
  targetFile: ParsedFile,
  keys: string[],
  text?: string,
  config?: IConfig
): Record<string, ParsedFile> => {
  const fileObj = targetFile.text || {};
  const path = keys.length ? keys : [];

  return {
    ...files,
    [targetFile.name]: {
      ...targetFile,
      text: set(fileObj, path, text, config),
    },
  };
};
