import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/spotify";

const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

export async function GET(url: string) {
  // test code
  url = '/browse/new-releases';
  console.log('url', url);

  try {
    const accessToken = await getAccessToken();

    const response = await fetch(SPOTIFY_API_URL + url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    console.log('response', response);

    if (!response.ok) {
      throw new Error("Failed to fetch Spotify data");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
