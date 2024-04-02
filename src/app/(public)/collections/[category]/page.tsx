import Categories from "@/components/categories/categories";
import { externalApi } from "@/utils/api";

export default async function CategoryPage({ params }: { params: { category: string } }) {
    console.log(params.category)
    const id = params.category.split('_')[1].split('.')[0] || 'fake-id'

    const [products, categories] = await Promise.all([
        externalApi.url(`/products?category=${id}&current=1&pageSize=100`).get().json<IBackendResponse<IPagination<IProducts[]>>>(),
        externalApi.url(`/categories/${id}`).get().json<IBackendResponse<ICategories>>()
    ])
    let data: IVariants[] = []
    if (products) {
        const rawData = products.data?.result.map(item => item.variants)
        rawData?.map(item => {
            item.map((v) => {
                if (v.label && v.variants) {
                    if (!data.some(item => item.label === v.label)) {
                        data.push({ label: v.label, variants: v.variants })
                    } else {
                        let temp = data.find(item => item.label === v.label)
                        if (temp?.variants) {
                            for (let i = 0; i < v?.variants?.length; i++) {
                                if (!temp?.variants.includes(v.variants[i])) {
                                    temp?.variants.push(v.variants[i])
                                }
                            }
                        }
                    }
                }
            })
        })
    }
    return (
        <Categories
            variants={data}
            products={products.data?.result ?? null} category={categories.data ?? null} />
    )
}