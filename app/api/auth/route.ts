import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  const { code } = await req.json();
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: `${req.nextUrl.origin}/dashboard`,
      grant_type: "authorization_code",
    }),
  });
  const tokenData = await tokenResponse.json();


  const userResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });
  const userData = await userResponse.json();


  return NextResponse.json({ id: userData.id, email: userData.email });
}
