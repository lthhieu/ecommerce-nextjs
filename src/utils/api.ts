import wretch from "wretch"

export const externalApi = wretch(process.env.BACKEND_URI) // Base url