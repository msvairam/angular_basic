export interface Receipe {
    name: string
    id: number
}

export interface SearchList {
    name: string,
    id: number
}

export interface ReceipeResponse {
    recipes: SearchList[]
}