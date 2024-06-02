'use server'

import { revalidateTag } from 'next/cache'

export default async function productAction() {
    revalidateTag('product-by-id')
}