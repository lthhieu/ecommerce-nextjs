declare global {
    /*~ Here, declare things that go in the global namespace, or augment
     *~ existing declarations in the global namespace
     */
    interface IBackendResponse<T> {
        data?: T,
        message: string | string[],
        statusCode: number,
        error?: string
    }
    interface ICategories {
        "_id": string,
        "title": string,
        "image": string,
        "slug": string,
        "createdAt": string,
        "updatedAt": string,
        "__v": number
    }
    interface ICategoriesWithIcons extends ICategories {
        icon: React.ReactNode
    }
    interface IPagination<T> {
        "meta": {
            "current": number,
            "pageSize": number,
            "pages": number,
            "total": number
        },
        "result": T
    }
    interface IProducts {
        "_id": string,
        "title": string,
        "slug": string,
        "description": string[],
        "brand": {
            "_id": string,
            "title": string
        },
        "price": number,
        "category": {
            "_id": string,
            "title": string
        },
        "quantity": number,
        "sold": number,
        "thumb": string,
        "images": string[],
        "variants": {
            label?: string,
            variants?: string[]
        }[],
        "information": {
            "warranty": string,
            "delivery": string
        },
        "ratings": [],
        "totalRating": number,
        "createdAt": string,
        "updatedAt": string,
        "__v": number
    }
    interface IBrands {
        _id: string,
        title: string
    }
    interface ICollections {
        category: ICategories,
        brands: IBrands[]
    }
    interface IVariants {
        label: string,
        variants: string[]
    }
    interface IRatings {
        postedBy: string,
        star: number,
        comment: string,
        postedAt: string
    }
}
export { };