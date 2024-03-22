import { api } from "@/utils/api"
import NextAuth, { AuthOptions, User } from "next-auth"
import { JWT } from "next-auth/jwt"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions: AuthOptions = {
    secret: process.env.NO_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const response = await api.post(`auth/login`, { json: { username: credentials?.username, password: credentials?.password } }).json<IBackendResponse<JWT>>()

                if (response && response.data) {
                    // Any object returned will be saved in `user` property of the JWT
                    return response.data as any
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token, account, user, trigger }) {
            if (trigger === 'signIn' && account?.provider !== 'credentials') {
                const response = await api.post(`auth/providers`, { json: { type: account?.provider.toUpperCase(), username: user.email } }).json<IBackendResponse<JWT>>()
                if (response.data) {
                    token.access_token = response.data.access_token
                    token.refresh_token = response.data.refresh_token
                    token.user = response.data.user
                    token.name = user?.name
                    token.picture = user?.image
                }
            }
            if (trigger === 'signIn' && account?.provider === 'credentials') {
                token.access_token = user.access_token
                token.refresh_token = user.refresh_token
                token.user = user.user
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.access_token = token.access_token
                session.refresh_token = token.refresh_token
                session.user = token.user
                session.user.name = token.name
                session.user.image = token.picture
            }
            return session
        },
    }
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }