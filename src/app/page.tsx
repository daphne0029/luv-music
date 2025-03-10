'use client'
// Home page
import Link from 'next/link'
import type { AppProps } from 'next/app';
import SearchBar from '@/components/searchBar/SearchBar';
import { useEffect, useState } from "react";
 
export default function Page({ Component, pageProps }: AppProps) {
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/spotify/new-releases")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log('error', data.error);
          throw new Error(data.error);
        }
        setAlbums(data.albums.items);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-screen">
      <div className="h-96 bg-violet-300/50 flex items-center">
        <div className="container mx-auto p-4">
          <SearchBar />
        </div>
      </div>

    {/* New Album Releases */}
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Spotify New Releases</h1>

        {loading && <p>Loading albums...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {albums.map((album) => (
            <li key={album.id} className="p-4 border rounded-lg shadow-md">
              <img src={album.images[0]?.url} alt={album.name} className="w-full rounded-lg" />
              <h2 className="text-lg font-semibold mt-2">{album.name}</h2>
            </li>
          ))}
        </ul>
      </div>

      {/* <Component {...pageProps} /> */}
    </div>
  );
}
