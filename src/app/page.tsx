// Home page
import Link from 'next/link'
import type { AppProps } from 'next/app';
import SearchBar from '@/components/searchBar/SearchBar';
 
export default function Page({ Component, pageProps }: AppProps) {
  return (
    <div className="w-screen">
      <div className="h-96 bg-violet-300/50 flex items-center">
        <div className="container mx-auto p-4">
          <SearchBar />
        </div>
      </div>
      {/* <Component {...pageProps} /> */}
    </div>
  );
}
