import Categories from "@/components/categories/categories";

export default function CategoryPage({ params }: { params: { category: string } }) {
    return (
        <Categories />
    )
    // <div>My Category: {params.category}</div>
}