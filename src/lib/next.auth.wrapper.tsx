'use client'
import { SessionProvider } from "next-auth/react"

const NextAuthWrapper = (props: { children: React.ReactNode }) => {
    return (
        <SessionProvider>{props.children}</SessionProvider>
    )
}
export default NextAuthWrapper