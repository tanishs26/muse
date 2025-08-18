"use client";
import { signIn,signOut, useSession } from "next-auth/react";

export default function SpotifyConnectButton() {
  const { data: session } = useSession();

  return (
    <button
      onClick={() => signIn("spotify")}
      style={{
        background: "#1DB954", color: "#fff", padding: "8px 16px", borderRadius: "8px"
      }}
      className=" w-full cursor-pointer active:scale-70  hidden text-center text-sm self-center items-center "
    >
      {session?.spotifyAccessToken
        ? "Spotify Connected"
        : "Connect Spotify "}
    </button>
  );
}
