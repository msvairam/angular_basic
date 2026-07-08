import { Type, Signal } from '@angular/core';


export interface Tab {
    id: number,
    name: string
    label: string
    component: () => Promise<Type<unknown>>
    status: Signal<boolean>
}