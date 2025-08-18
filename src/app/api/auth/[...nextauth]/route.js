import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const handler =NextAuth( {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
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
