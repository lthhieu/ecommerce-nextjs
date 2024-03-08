import SectionOne from "@/components/home/section.one";

export default async function Home() {
  const response = await fetch('http://localhost:8000/api/v1/products?sort=-sold&current=1&pageSize=1')
  const result = await response.json()
  console.log(result.data.result)
  return (
    <>
      <SectionOne />
    </>
  );
}
