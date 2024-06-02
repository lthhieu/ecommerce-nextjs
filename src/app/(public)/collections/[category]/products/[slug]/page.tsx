import DetailProducts from "@/components/detail.products/detail.products";
import { externalApi, sendRequest } from "@/utils/api";

export default async function Page({ params }: { params: { slug: string, category: string } }) {
    const id = params.slug.split('_')[1].split('.')[0] || 'fake-id'
    let productsByCategory = null

    const [categories, products] = await Promise.all([
        externalApi.url(`/categories/slug/${params.category}`).get().json<IBackendResponse<ICategories>>(),
        sendRequest({ next: { tags: ['product-by-id'] } }).url(`/products/${id}`).get().json<IBackendResponse<IProducts>>()
    ])

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