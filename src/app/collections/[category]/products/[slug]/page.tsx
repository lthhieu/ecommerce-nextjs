import DetailProducts from "@/components/detail.products/detail.products";

export default function Page({ params }: { params: { slug: string } }) {
    return <DetailProducts slug={params.slug} />
}