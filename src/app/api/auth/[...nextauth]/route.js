import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const handler = NextAuth({
  providers: [
    SpotifyProvider({
      clientId: "87030b77be72491492eeed357dc4aa44",
      clientSecret: "a8e3d9a83da3426aa7946ed2a4c81a9c",
      authorization:
        "https://accounts.spotify.com/authorize?scope=user-read-email,streaming,user-modify-playback-state,user-read-playback-state,user-read-currently-playing",
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.spotifyAccessToken = account.access_token;
        token.spotifyRefreshToken = account.refresh_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.spotifyAccessToken = token.spotifyAccessToken;
      session.spotifyRefreshToken = token.spotifyRefreshToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
