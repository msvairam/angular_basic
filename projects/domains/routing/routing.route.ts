import { Routes } from '@angular/router';
import { UnsavedChangesGuard } from '../../lib-common/guards/unsaved.guard';
import { FeatureFlagGuard } from '../../lib-common/guards/feature.guard';
import { Feature } from '../../lib-common/service/feature';

export const RoutingRoutes: Routes = [
    {
        path: 'usecase1/:id',
        loadComponent: () =>  import('./overview/usecase1/product').then((m) => m.Product),
        children: [
            {
                path: 'info',
                loadComponent: () => import('./overview/usecase1/product-info').then((m) => m.ProductInfo), 
                canDeactivate: [UnsavedChangesGuard]
            },
            {
                path: 'review',
                providers: [Feature],
                loadComponent: () => import('./overview/usecase1/product-review').then((m) => m.ProductReview),
                canMatch: [FeatureFlagGuard],
            },
            {
                path: 'review',
                redirectTo: 'info',
                pathMatch: 'full',
            }
        ]
    }
]