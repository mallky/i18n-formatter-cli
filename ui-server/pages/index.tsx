import type { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  LoadFiles,
  RadioButtons,
  TabView,
  Translate,
  Dialog,
} from '../components';
import { Params } from '../components/Dialog/Dialog';
import { filesSelector, filesState, ParsedFile } from '../store/files';
import { standardState } from '../store/standard';
import styles from '../styles/Home.module.css';
import { addToAllFiles } from '../utils/files/addToAllFiles';
import { download } from '../utils/download';

const Home: NextPage = () => {
  const setFiles = useSetRecoilState(filesState);
  const filesArr = useRecoilValue(filesSelector);
  const [standardFile, setStandardState] = useRecoilState(standardState);
  const [params, setParams] = useState<Params | null>(null);

  const handleDownload = useCallback(() => {
    filesArr.forEach((file) => {
      download(file.name, JSON.stringify(file.text || {}));
    });
  }, [filesArr]);

  const hanldeAddAllKeys = useCallback(() => {
    setFiles((files) => {
      if (!standardFile || !files[standardFile]) {
        return files;
      }

      return addToAllFiles(files, standardFile);
    });
  }, [setFiles, standardFile]);

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>i18n-form</title>
          <meta
            name="description"
            content="i18n-form helper to avoid mistakes in translations"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>Welcome to i18n-form!</h1>
          <p className={styles.description}>
            Get started by uploading json files with translations
          </p>

          <LoadFiles />

          <RadioButtons
            title="Please select standard file"
            items={filesArr.map((file) => ({ name: file.name, id: file.name }))}
            onSelect={setStandardState}
          />

          {standardFile && (
            <>
              <button onClick={hanldeAddAllKeys}>Add keys for all files</button>
              <TabView<ParsedFile>
                data={filesArr.map((file, idx) => ({
                  id: `${file.name}-${idx}`,
                  data: file,
                }))}
                renderItem={(props) => (
                  <Translate
                    {...props.data}
                    openDialog={(params) => {
                      setParams(params);
                    }}
                  />
                )}
              />

              <button onClick={handleDownload}>Download</button>
            </>
          )}
        </main>

        <footer className={styles.footer}>Created by Makar Kuzmichev</footer>
      </div>
      {!!params && (
        <Dialog params={params} closeDialog={() => setParams(null)} />
      )}
    </>
  );
};

export default Home;
