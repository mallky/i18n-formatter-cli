import React, { useCallback, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { filesState, ParsedFile } from '../../store/files';
import styles from '../../styles/Dialog.module.css';
import { SEPARATOR } from '../../utils/constants';
import { setNewValue, removeKey, getLine, parseObj } from '../../utils/files';
import { IConfig, Item } from '../../utils/types';
import TextInput from '../TextInput';

export interface Params {
  id: string;
  addNew?: boolean;
  isKey?: boolean;
}

interface DialogProps {
  closeDialog: () => void;
  params: Params;
}

const Dialog = ({ params, closeDialog }: DialogProps) => {
  const id = params?.id;
  const [files, setFiles] = useRecoilState(filesState);
  const keys = Object.keys(files);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        closeDialog && closeDialog();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      document.body.style.overflow = 'auto';
    };
  }, [closeDialog]);

  const handleSetChangedText = useCallback(
    (id: string, config?: IConfig) => (text?: string) => {
      const [name, ...keys] = id.split(SEPARATOR);

      setFiles((files) => {
        const filesArr = Object.values(files);

        if (config?.addNew || config?.isKey) {
          return filesArr.reduce<Record<string, ParsedFile>>((acc, file) => {
            return setNewValue(acc, file, keys, text, config);
          }, {});
        }

        const file = files[name];
        return setNewValue(files, file, keys, text, config);
      });
    },
    [setFiles]
  );

  const handleRemoveKey = useCallback(
    (id: string) => {
      setFiles((files) => {
        const [name, ...path] = id.split(SEPARATOR);
        const fileObj = files[name] ? files[name].text || {} : {};

        return {
          ...files,
          [name]: {
            name,
            text: removeKey(path, fileObj),
          },
        };
      });
    },
    [setFiles]
  );

  const renderStrings = useCallback(() => {
    if (!id) {
      return null;
    }
    const [_name, ...path] = id.split(SEPARATOR);
    const addNewControls = (id: string) => (
      <span>
        <button
          onClick={() =>
            handleSetChangedText(id, { addNew: true, type: 'line' })()
          }
        >
          Add new line
        </button>
        <button
          onClick={() =>
            handleSetChangedText(id, {
              addNew: true,
              type: 'object',
            })()
          }
        >
          Add new object
        </button>
      </span>
    );

    const parse = (item: Item) => {
      const { id, text, value, config } = item;
      const isKey = config.isKey;
      const addNew = config.addNew;

      if (isKey) {
        return (
          <div key={text} className={styles.item}>
            <TextInput
              setChangedText={handleSetChangedText(id, { isKey: true })}
              text={text}
              onRemove={() => handleRemoveKey(id)}
            />
            {addNew && addNewControls(id)}: {value?.map(parse)}
          </div>
        );
      }
      return (
        <TextInput setChangedText={handleSetChangedText(id)} text={text} />
      );
    };

    return (
      <>
        <h1>{path.join(' > ')}</h1>
        <>
          {keys.map((key) => {
            const lineData = getLine(files[key].text || {}, path);
            const id = [key, ...path].join(SEPARATOR);

            return (
              <React.Fragment key={key}>
                <h1>{key}</h1>
                <TextInput
                  text={lineData.key}
                  setChangedText={handleSetChangedText(id, { isKey: true })}
                  onRemove={() => handleRemoveKey(id)}
                />
                {typeof lineData.value !== 'string' && addNewControls}
                :&nbsp;
                {lineData.value &&
                  (typeof lineData.value === 'string' ? (
                    <TextInput
                      text={lineData.value}
                      setChangedText={handleSetChangedText(id)}
                    />
                  ) : (
                    parseObj(lineData.value, id).map(parse)
                  ))}
              </React.Fragment>
            );
          })}
        </>
      </>
    );
  }, [id, keys, handleSetChangedText, handleRemoveKey, files]);

  return (
    <div className={styles.overlay}>
      <div className={styles.content} ref={ref}>
        <div>{renderStrings()}</div>
        <button onClick={closeDialog}>Close</button>
      </div>
    </div>
  );
};

export default Dialog;
