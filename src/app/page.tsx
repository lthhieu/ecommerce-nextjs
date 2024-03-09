import SectionOne from "@/components/home/section.one";
import { api } from "@/utils/api";

export default async function Home() {
  const response = await api.get('categories').json<IBackendResponse<ICategories[]>>();
  return (
    <>
      <SectionOne categories={response.data ?? []} />
    </>
  );
}
