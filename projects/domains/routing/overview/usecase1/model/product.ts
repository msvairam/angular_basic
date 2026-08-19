export interface Product {
    id:  number
    title: string
    description: string
    price: number
    category: string
}

export interface ProductRequest {
    limit: number,
    q: string,
    skip: number,
}

export interface ProductResponse {
    limit: number,
    products: Product[],
    skip: number,
    total: number,
}
