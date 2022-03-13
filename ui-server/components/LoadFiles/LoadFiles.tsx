import React, { ChangeEvent, FC, useCallback, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { filesState, ParsedFile } from '../../store/files';

interface ILoadFiles {}

const LoadFiles: FC<ILoadFiles> = ({}) => {
  const setFiles = useSetRecoilState(filesState);
  const inputRef = useRef(null);

  const handleLoadFiles = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const uploadFiles = e.currentTarget.files || [];
      const files: Record<string, ParsedFile> = {};

      for (let i = 0; i < uploadFiles.length; i++) {
        const text = await uploadFiles[i].text();
        const name = uploadFiles[i].name;
        files[name] = { text: JSON.parse(text || ''), name };
      }
      setFiles(files);
    },
    [setFiles]
  );

  return (
    <>
      <h3>Please download files</h3>
      <input
        type="file"
        accept="application/JSON"
        ref={inputRef}
        multiple
        onChange={handleLoadFiles}
      />
    </>
  );
};

export default LoadFiles;
