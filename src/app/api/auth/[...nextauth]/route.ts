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
        async jwt({ token, user, account, profile }) {
            console.log('hi', token, user, account, profile)
            return token

        }
    }
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }