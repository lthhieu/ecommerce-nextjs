import FeaturedProducts from "@/components/home/featured.products";
import HotCollections from "@/components/home/hot.collections";
import SectionOne from "@/components/home/section.one";
import SectionTwo from "@/components/home/section.two";
import { externalApi } from "@/utils/api";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/auth";

export default async function Home() {
  const session = await getServerSession(authOptions)
  // console.log('hieu >>>', session)
  const response = await Promise.all([
    externalApi.url('/categories').get().json<IBackendResponse<ICategories[]>>(),
    externalApi.url('/products?current=1&pageSize=5&sort=-sold').get().json<IBackendResponse<IPagination<IProducts[]>>>(),
    externalApi.url('/products?current=1&pageSize=5').get().json<IBackendResponse<IPagination<IProducts[]>>>(),
    externalApi.url('/products?current=1&pageSize=9&totalRating=5').get().json<IBackendResponse<IPagination<IProducts[]>>>()
  ])

  let categoriesWithBrands: ICollections[] = []

  if (response[0] && response[0].data && response[0].data?.length > 0) {
    let result = []
    for (let i = 0; i < 6; i++) {
      const res = await Promise.resolve(externalApi.url(`/products?current=1&pageSize=100&category=${response[0].data[i]._id}`).get().json<IBackendResponse<IPagination<IProducts[]>>>())

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
