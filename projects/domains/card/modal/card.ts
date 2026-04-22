export interface Card {
    userId: string
    id: string
    title: string
    body: string
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}