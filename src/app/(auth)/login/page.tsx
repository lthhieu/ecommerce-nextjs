import SignIn from "@/components/auth/login";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation'
export default async function LoginPage() {
    const session = await getServerSession(authOptions)
    if (session) {
        redirect('/')
    }
    return (
        <section>
            <SignIn />
        </section>
    )
}