import FeaturedProducts from "@/components/home/featured.products";
import HotCollections from "@/components/home/hot.collections";
import SectionOne from "@/components/home/section.one";
import SectionTwo from "@/components/home/section.two";
import { api } from "@/utils/api";

export default async function Home() {
  const response = await Promise.all([
    api.get('categories').json<IBackendResponse<ICategories[]>>(),
    api.get('products?current=1&pageSize=5&sort=-sold').json<IBackendResponse<IPagination<IProducts[]>>>(),
    api.get('products?current=1&pageSize=5').json<IBackendResponse<IPagination<IProducts[]>>>(),
    api.get('products?current=1&pageSize=9&totalRating=5').json<IBackendResponse<IPagination<IProducts[]>>>()
  ])

  let categoriesWithBrands: ICollections[] = []

  if (response[0] && response[0].data && response[0].data?.length > 0) {
    let result = []
    for (let i = 0; i < 6; i++) {
      const res = await Promise.resolve(api.get(`products?current=1&pageSize=100&category=${response[0].data[i]._id}`).json<IBackendResponse<IPagination<IProducts[]>>>())

      const data = res.data?.result
      const brands = data && data.map((element) => element.brand);

      let uniqueBrands = brands && brands.filter((value, index, self) =>
        index === self.findIndex((t) => (
          t._id === value._id
        ))
      )
      let collections: ICollections = {
        category: {} as ICategories,
        brands: [] as IBrands[]
      }
      collections.brands = uniqueBrands ? uniqueBrands : []
      collections.category = response[0].data[i]
      result.push(collections)
    }
    categoriesWithBrands = result
  }

  return (
    <>
      <SectionOne categories={response[0]?.data ?? []} />
      <SectionTwo bestSeller={response[1]?.data?.result ?? []} newArrival={response[2]?.data?.result ?? []} />
      <FeaturedProducts featuredProducts={response[3]?.data?.result ?? []} />
      <HotCollections categoriesWithBrands={categoriesWithBrands} />
    </>
  );
}
