import DetailProducts from "@/components/detail.products/detail.products";
import { api } from "@/utils/api";

export default async function Page({ params }: { params: { slug: string, category: string } }) {
    const id = params.slug.split('_')[1].split('.')[0] || 'fake-id'
    let productsByCategory = null

    const [categories, products] = await Promise.all([
        api.get(`categories/slug/${params.category}`).json<IBackendResponse<ICategories>>(),
        api.get(`products/${id}`).json<IBackendResponse<IProducts>>()
    ])

    if (!products.data) {
        console.log('failed !')
    }
    if (categories.data) {
        const response = await api.get(`products?category=${categories.data._id}&current=1&pageSize=6`).json<IBackendResponse<IPagination<IProducts[]>>>()
        if (response.data) {
            productsByCategory = response.data.result
        }
    }
    return <DetailProducts data={products.data || null} productsByCategory={productsByCategory} />
}