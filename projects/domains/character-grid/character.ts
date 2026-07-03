export interface PageResult {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  image: string
}

export interface PageInfo {
    count: number
    pages: number
    next: string | null
    prev: string | null
}

export interface PageResponse {
    info: PageInfo
    results: PageResult[]
}
