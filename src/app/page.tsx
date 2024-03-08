import SectionOne from "@/components/home/section.one";
import { api } from "@/utils/api";

export default async function Home() {
  const categories = await api.get('categories').json();
  console.log('hieu', categories)
  return (
    <>
      <SectionOne />
    </>
  );
}
