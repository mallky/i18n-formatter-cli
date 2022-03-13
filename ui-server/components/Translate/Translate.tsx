import React, { FunctionComponent, useCallback } from 'react';
import styles from '../../styles/Translate.module.css';
import { parseObj } from '../../utils/files/parseObj';
import { Item } from '../../utils/types';

interface TranslateProps {
  text?: Record<string, any> | null;
  name?: string;

  openDialog: (params: any) => void;
}

const Translate: FunctionComponent<TranslateProps> = ({
  text,
  name,
  openDialog,
}) => {
  const parse = useCallback(
    (item: Item) => {
      const { id, text, value, config } = item;
      const isKey = config.isKey;

      if (isKey) {
        return (
          <div key={text} className={styles.item}>
            <span onClick={() => openDialog({ id, isKey: true })}>{text}</span>:{' '}
            {value?.map(parse)}
          </div>
        );
      }
      return (
        <span key={`${text}-value`} onClick={() => openDialog({ id })}>
          {text}
        </span>
      );
    },
    [openDialog]
  );

  const renderText = useCallback(() => {
    if (!text) {
      return null;
    }

    try {
      const fileObj = text || {};
      console.log(fileObj, name);

      return parseObj(fileObj, name).map(parse);
    } catch (e) {
      return <div>Error! Seems like the file {name} is not json</div>;
    }
  }, [text, name, parse]);

  if (!text) {
    return <div>Please load files</div>;
  }

  return (
    <>
      <p>{name}</p>
      <div className={styles.translateContainer}>{renderText()}</div>
    </>
  );
};

export default Translate;
