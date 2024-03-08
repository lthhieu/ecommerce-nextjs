import SectionOne from "@/components/home/section.one";
import { api } from "@/utils/api";

export default async function Home() {
  const categories = await api.get('categories').json<IBackendResponse<ICategories[]>>();
  console.log('hieu', categories.data[0]?.title ?? [])
  return (
    <>
      <SectionOne />
    </>
  );
}
