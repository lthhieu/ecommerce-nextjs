import Categories from "@/components/categories/categories";
import { externalApi } from "@/utils/api";
import _ from "lodash";

export default async function CategoryPage({ params }: { params: { category: string } }) {
    const id = params.category.split('_')[1].split('.')[0] || 'fake-id'

    const [products, categories] = await Promise.all([
        externalApi.url(`/products?category=${id}&current=1&pageSize=100&sort=-sold`).get().json<IBackendResponse<IPagination<IProducts[]>>>(),
        externalApi.url(`/categories/${id}`).get().json<IBackendResponse<ICategories>>()
    ])
    let data: IVariants[] = []
    if (products) {
        const rawData = _.map(_.get(products, 'data.result', []), 'variants')
        _.forEach(rawData, item => {
            _.forEach(item, v => {
                if (v.label && v.variants) {
                    const isExistedLabel = _.findIndex(data, { label: v.label })
                    if (isExistedLabel === -1) {
                        data.push({ label: v.label, variants: v.variants })
                    } else {
                        let temp = data[isExistedLabel]
                        temp.variants = _.union(temp.variants, v.variants)
                    }
                }
            })
        })
    }
    return (
        <Categories
            idCate={id}
            variants={data}
            products={products.data?.result ?? null} category={categories.data ?? null} />
    )
}