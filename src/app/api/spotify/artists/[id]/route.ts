import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "@/lib/spotify";
import { TEST_ARTIST_ALBUM_RESULT, TEST_ARTIST_RESULT } from "./sampleData";

const SPOTIFY_API_URL = 'https://api.spotify.com/v1/';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!params.id) {
    throw new Error('no artist id');
  }

  console.log(SPOTIFY_API_URL + params.id);

  try {
    const accessToken = await getAccessToken();
    console.log(accessToken);

    const artistUrl = SPOTIFY_API_URL + `artist/${params.id}`;
    const artistAlbumUrl = SPOTIFY_API_URL + `artist/${params.id}/albums`;

    console.log('artistUrl', artistUrl);
    console.log('artistAlbumURL', artistAlbumUrl);

    const [artistResponse, artistAlbumResponse] = await Promise.all([
      fetch(artistUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
      fetch(artistAlbumUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    ]);

    const artistData = await artistResponse.json();
    const artistAlbumData = await artistAlbumResponse.json();

    // if (!artistResponse.ok || !artistAlbumResponse.ok) {
    //   console.log(artistData.error);
    //   console.log(artistAlbumData.error);
    //   throw new Error(`Failed to fetch artist data: ${artistData.error}; artist albums error ${artistAlbumData.error}`);
    // }

    // return NextResponse.json({
    //   detail: artistData,
    //   tracks: artistAlbumData.items,
    // });

    return NextResponse.json({
      artist: JSON.parse(TEST_ARTIST_RESULT),
      albums: JSON.parse(TEST_ARTIST_ALBUM_RESULT),
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
