import wretch from "wretch"

export const externalApi = wretch(process.env.NEXT_PUBLIC_BACKEND_URI) // Base url

export const sendRequest = (props?: any) => {
    const options: any = {
        ...props
    };
    return wretch(process.env.NEXT_PUBLIC_BACKEND_URI, options)
}