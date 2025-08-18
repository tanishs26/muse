"use client";
import { signIn, useSession } from "next-auth/react";

export default function SpotifyConnectButton() {
  const { data: session } = useSession();

  return (
    <button
      onClick={() => signIn("spotify")}
      style={{
        background: "#1DB954", color: "#fff", padding: "8px 16px", borderRadius: "8px"
      }}
    >
      {session?.spotifyAccessToken
        ? "Spotify Connected"
        : "Connect Spotify Account"}
    </button>
  );
}
