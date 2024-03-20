import NextAuth, { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions: AuthOptions = {
    secret: process.env.NO_SECRET,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token, account, user, trigger }) {
            if (trigger === 'signIn' && account?.provider !== 'credentials') {
                token.access_token = 'fake token'
                token.refresh_token = 'fake token'

            }
            return token
        },
        async session({ session, user, token }) {
            if (session) {
                session.access_token = token.access_token
            }
            return session
        },
    }
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }