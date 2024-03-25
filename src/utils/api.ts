import ky from 'ky';
import wretch from "wretch"

export const api = ky.create({
    prefixUrl: process.env.BACKEND_URI
});

export const externalApi = wretch(process.env.BACKEND_URI) // Base url