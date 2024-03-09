import SectionOne from "@/components/home/section.one";
import SectionTwo from "@/components/home/section.two";
import { api } from "@/utils/api";
import ky from "ky";

export default async function Home() {
  const response = await Promise.all([
    api.get('categories').json<IBackendResponse<ICategories[]>>(),
    api.get('products?current=1&pageSize=5&sort=-sold').json<IBackendResponse<IPagination<IProducts[]>>>(),
    api.get('products?current=1&pageSize=5').json<IBackendResponse<IPagination<IProducts[]>>>()
  ])

  return (
    <>
      <SectionOne categories={response[0]?.data ?? []} />
      <SectionTwo bestSeller={response[1]?.data?.result ?? []} newArrival={response[2]?.data?.result ?? []} />
      <div style={{ height: '500px' }}></div>
    </>
  );
}
