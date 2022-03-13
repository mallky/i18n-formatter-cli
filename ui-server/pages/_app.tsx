import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot, useRecoilSnapshot } from 'recoil';
import { useEffect } from 'react';

function DebugObserver(): JSX.Element | null {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    console.log('The following atoms were modified:');
    // @ts-ignore
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.log(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);

  return null;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <DebugObserver />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
