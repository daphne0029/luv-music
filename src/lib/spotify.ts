const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;

export async function redirectToAuthCodeFlow(clientId: string) {
  // TODO: Redirect to Spotify authorization page
}

export async function refreshToken() {
  // TODO: Refresh Token
}

export async function getAccessToken() {
  const authHeader = `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`;

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(`Error fetching access token: ${data.error}`);
  }

  return data.access_token;
}

export async function fetchProfile(token: string): Promise<any> {
  // TODO: Call Web API
}

export function populateUI(profile: any) {
  // TODO: Update UI with profile data
}
