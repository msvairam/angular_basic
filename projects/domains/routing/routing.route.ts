import { Routes } from '@angular/router';
import { provideHttpClient, HTTP_INTERCEPTORS, withInterceptorsFromDi, withRequestsMadeViaParent, withInterceptors } from '@angular/common/http';
import { UnsavedChangesGuard } from '../../lib-common/guards/unsaved.guard';
import { FeatureFlagGuard } from '../../lib-common/guards/feature.guard';
import { Feature } from '../../lib-common/service/feature';
import { legacyInterceptor } from '../../lib-common/interceptor/legacy.interceptor';
import { ProductData } from './overview/usecase1/product-data';
import { ProductHttpInterceptors } from './overview/usecase1/product.interceptor';


export const RoutingRoutes: Routes = [
    {
        path: 'usecase1/:id',
        loadComponent: () =>  import('./overview/usecase1/product').then((m) => m.Product),
        providers: [
            ProductData,
           provideHttpClient(
                withInterceptors([ProductHttpInterceptors]),
                withRequestsMadeViaParent(),
                withInterceptorsFromDi()
           ),
            {
                provide: HTTP_INTERCEPTORS,
                useClass: legacyInterceptor,
                multi: true,

            }
        ],
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