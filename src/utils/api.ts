import wretch from "wretch"

export const externalApi = wretch(process.env.NEXT_PUBLIC_BACKEND_URI) // Base url
