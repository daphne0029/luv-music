import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { getAccessToken, refreshAccessToken } from "@/lib/spotify";

const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!params.id) {
    throw new Error('no album id');
  }

  try {
    const accessToken = await getAccessToken();
    console.log(accessToken);

    const albumUrl = SPOTIFY_API_URL + `/albums/${params.id}`;
    const tracksUrl = SPOTIFY_API_URL + `/albums/${params.id}/tracks`;

    console.log(albumUrl);
    console.log(tracksUrl);

    const [albumResponse, tracksResponse] = await Promise.all([
      fetch(albumUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
      fetch(tracksUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    ]);

    if (!albumResponse.ok || !tracksResponse.ok) {
      throw new Error('Failed to fetch data');
    }

    const albumData = await albumResponse.json();
    const tracksData = await tracksResponse.json();

    return NextResponse.json({
      detail: albumData,
      tracks: tracksData.items,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
