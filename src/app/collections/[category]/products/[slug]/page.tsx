import DetailProducts from "@/components/detail.products/detail.products";
import { api } from "@/utils/api";

export default async function Page({ params }: { params: { slug: string } }) {
    const id = params.slug.split('_')[1].split('.')[0] || 'fake-id'
    const response = await api.get(`products/${id}`).json<IBackendResponse<IProducts>>()
    if (!response.data) {
        console.log('failed !')
    }
    return <DetailProducts data={response.data || null} />
}