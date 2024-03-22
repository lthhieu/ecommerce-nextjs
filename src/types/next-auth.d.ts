import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

interface IUser {
    "_id": string,
    "firstName"?: string,
    "lastName"?: string,
    "email"?: string,
    "mobile"?: string,
    "role": string,
    "wishlist": [],
    "isBlocked": boolean,
    "type": string,
    "username"?: string,
    "cart": [],
    "createdAt": string,
    "updatedAt": string,
    "__v": number
}

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        "access_token": string,
        "refresh_token": string,
        user: IUser & DefaultSession["user"]
    }
    interface User {
        "access_token": string,
        "refresh_token": string,
        user: IUser & DefaultSession["user"]
    }
}
declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        "access_token": string,
        "refresh_token": string,
        "user": IUser
    }
}