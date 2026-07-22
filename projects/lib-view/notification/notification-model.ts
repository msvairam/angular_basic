export interface iNotification {
    id: number,
    type: string,
    title: string
    description: string
    onRemove?: () => boolean
    isPrograss?: string
}