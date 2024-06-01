import DetailProducts from "@/components/detail.products/detail.products";
import { externalApi } from "@/utils/api";

export default async function Page({ params }: { params: { slug: string, category: string } }) {
    const id = params.slug.split('_')[1].split('.')[0] || 'fake-id'
    let productsByCategory = null

    const [categories, products] = await Promise.all([
        externalApi.url(`/categories/slug/${params.category}`).get().json<IBackendResponse<ICategories>>(),
        externalApi.url(`/products/${id}?_=${new Date().getTime()}`).get().json<IBackendResponse<IProducts>>()
    ])
    // const test = await (await fetch("http://localhost:8000/api/v1/products/65b0b261437b815d977e3e1d", { cache: 'no-store' })).json()

    if (!products.data) {
        console.log('failed !')
    }
    if (categories.data) {
        const response = await externalApi.url(`/products?category=${categories.data._id}&current=1&pageSize=6`).get().json<IBackendResponse<IPagination<IProducts[]>>>()
        if (response.data) {
            productsByCategory = response.data.result
        }
    }
    return <DetailProducts data={products.data || null} productsByCategory={productsByCategory} category={categories.data || null} />
}