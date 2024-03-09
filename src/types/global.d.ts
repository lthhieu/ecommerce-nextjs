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
        "image"?: string,
        "slug"?: string,
        "createdAt"?: string,
        "updatedAt"?: string,
        "__v"?: number
    }
    interface ICategoriesWithIcons extends ICategories {
        icon: React.ReactNode
    }
}
export { };