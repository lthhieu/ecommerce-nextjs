import Categories from "@/components/categories/categories";
import { externalApi } from "@/utils/api";

export default async function CategoryPage({ params }: { params: { category: string } }) {
    console.log(params.category)
    const id = params.category.split('_')[1].split('.')[0] || 'fake-id'

    const [products, categories] = await Promise.all([
        externalApi.url(`/products?category=${id}&current=1&pageSize=100`).get().json<IBackendResponse<IPagination<IProducts[]>>>(),
        externalApi.url(`/categories/${id}`).get().json<IBackendResponse<ICategories>>()
    ])
    return (
        <Categories products={products.data?.result ?? null} category={categories.data ?? null} />
    )
}