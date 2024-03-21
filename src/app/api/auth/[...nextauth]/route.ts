import { api } from "@/utils/api"
import NextAuth, { AuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt"
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
                const response = await api.post(`auth/providers`, { json: { type: 'GITHUB', username: user.email } }).json<IBackendResponse<JWT>>()
                if (response.data) {
                    token.access_token = response.data.access_token
                    token.refresh_token = response.data.refresh_token
                    token.user = response.data.user
                    token.email = user.email
                    token.name = user.name
                    token.picture = user.image
                }
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.access_token = token.access_token
                session.refresh_token = token.refresh_token
                session.user = token.user
                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.picture
            }
            return session
        },
    }
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }