export interface Category {
    id: number
    name: string
    checked: boolean
    indeterminate: boolean
    children: Category[]
}