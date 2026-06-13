export interface Product {
    id:  number
    title: string
    description: string
    price: number
    category: string
}

export interface ProductResponse {
    limit: number,
    products: Product[],
    skip: number,
    total: number,
}
