import ky from 'ky';

// On https://my-site.com

export const api = ky.create({
    prefixUrl: process.env.BACKEND_URI,
    // hooks: {
    //     afterResponse: [
    //         (_request, _options, response) => {
    //             // You could do something with the response, for example, logging.
    //             return response

    //             // Or return a `Response` instance to overwrite the response.
    //             // return new Response('A different response', { status: 200 });
    //         },

    //         // Or retry with a fresh token on a 403 error
    //         async (request, options, response) => {
    //             if (response.status === 403) {
    //                 // Get a fresh token
    //                 const token = await ky('https://example.com/token').text();

    //                 // Retry with the token
    //                 request.headers.set('Authorization', `token ${token}`);

    //                 return ky(request);
    //             }
    //         }
    //     ]
    // }
});