'use client'
import { useEffect, useState } from "react";
import { parseArgs } from "util";

export default function Page({ params }: { params: { id: string } }) {
  const [detail, setAlbumDetail] = useState<any>();
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/spotify/albums/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log('error', data.error);
          throw new Error(data.error);
        }
        setAlbumDetail(data.detail);
        setTracks(data.tracks);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [params.id]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      {detail && (
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
          <img src={detail.images?.[0]?.url} alt={detail.name} className="w-full h-64 object-cover rounded-lg mb-4" />
          <h1 className="text-2xl font-bold">{detail.name}</h1>
          <p className="text-gray-400">By {detail.artists?.map((artist: any) => artist.name).join(", ")}</p>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Tracks</h2>
        <ul className="space-y-2">
          {tracks.map((track) => (
            <li key={track.id} className="bg-gray-800 text-white p-3 rounded-lg">
              {track.track_number}. {track.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
