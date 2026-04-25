import { Routes } from '@angular/router';

export const productRoutes : Routes = [
    {
        path: 'info',
        loadComponent: () => import('./product-info').then((m) => m.ProductInfo),
    },
    {
        path: 'review',
        loadComponent: () => import('./product-review').then((m) => m.ProductReview),
    }
]