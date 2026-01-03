import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.idToken = (account as any).id_token
        token.accessToken = (account as any).access_token
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        idToken: token.idToken as string | undefined,
        accessToken: token.accessToken as string | undefined,
      }
    },
  },
})
