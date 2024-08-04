import { externalApi } from "@/utils/api"
import { AuthOptions } from "next-auth"
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
                const response = await externalApi.url('/auth/login').post({
                    username: credentials?.username, password: credentials?.password
                }).unauthorized(error => { throw new Error(error.json.message) })
                    .json<IBackendResponse<JWT>>()
                if (response && response.data) {
                    return response.data as any
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
                const response = await externalApi.url('/auth/providers').post({
                    type: account?.provider.toUpperCase(), username: user.email, name: user.name, avatar: user.image
                }).json<IBackendResponse<JWT>>()
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