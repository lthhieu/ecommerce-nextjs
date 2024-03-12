export default function CategoryPage({ params }: { params: { category: string } }) {
    return <div>My Category: {params.category}</div>
}