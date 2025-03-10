import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/spotify";

const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

export async function GET() {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(SPOTIFY_API_URL + '/browse/new-releases', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Spotify data: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
