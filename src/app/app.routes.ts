import { Routes } from '@angular/router';
import { authGuard } from '../../projects/lib-common/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('../../projects/domains/home/view/view').then((m => m.Home))
    },
    {
        path: 'card',
        canActivate: [authGuard],
        loadComponent: () => import('@feature-card/feature-card-list').then((m => m.FeatureCardList)),
    }
];
