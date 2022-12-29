import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
  // theme: {
  //   logo: "https://links.papareact.com/sq0",
  //   brandColor: "#f13287",
  //   colorScheme: "auto",
  // },
  pages: { signIn: "/auth/signin" },
  callbacks: {
    async session({ session, token, user }) {
      session.user.username = session.user.name.split(" ").join("");
      session.user.uid = token.sub;

      return session;
    },
  },
};
export default NextAuth(authOptions);
