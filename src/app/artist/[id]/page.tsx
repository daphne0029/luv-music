'use client'
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [artist, setAirtistDetails] = useState<any>();
  const [artistAlbums, setArtistAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  fetch(`/api/spotify/artists/${params.id}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
          console.log('error', data.error);
          throw new Error(data.error);
      }
      setAirtistDetails(data.artist);
      setArtistAlbums(data.albums.items);
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
  }, [params.id]);

  if (!artist) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="p-4 bg-gray-800 text-center text-xl font-bold">
        Hardcoded Data for testing
      </header>
      <header className="p-4 bg-gray-800 text-center text-xl font-bold">
        Luv Music - {artist.name}
      </header>

      <main className="container mx-auto p-6">
        <section className="text-center">
          <h1 className="text-3xl font-semibold">{artist.name}</h1>
          <p className="text-gray-400 mt-2">{artist.genres?.join(", ") || "Unknown Genre"}</p>
        </section>

        <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {artist.images?.[0]?.url && (
            <img
              src={artist.images[0].url}
              alt={artist.name}
              className="rounded-lg shadow-lg"
            />
          )}
          <div>
            <h2 className="text-2xl font-semibold">About the Artist</h2>
            <p className="mt-2 text-gray-300">
              {artist.followers ? `Followers: ${artist.followers.total}` : "No follower data"}
            </p>
            <div className="mt-10">
              <h2 className="text-2xl font-semibold ml-1">Artist Albums</h2>
              {loading && <p>Loading albums...</p>}
              {artistAlbums.map((album) => (
                <div key={album.id} className="pt-5 columns-4">
                  <img src={album.images[0]?.url} alt={album.name} className="w-full rounded-lg" />
                  <h2 className="text-lg font-semibold mt-2">{album.name}</h2>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
