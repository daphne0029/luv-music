import Link from 'next/link'
import type { AppProps } from 'next/app';
import NavBar from '@/comonents/navBar/NavBar';
 
export default function Page({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      {/* <Component {...pageProps} /> */}
    </>
  );
}
