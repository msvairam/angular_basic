import { Routes, ResolveFn } from '@angular/router';
import { authGuard } from '../../projects/lib-common/guards/auth.guard';

const titleResolver: ResolveFn<string> = (route) => route.queryParams['id'];

const dataResolver: ResolveFn<string> = () => 'testing'

export const routes: Routes = [
    {
        path: '',
        redirectTo: (ActivatedRouteSnapshot) => {
            const id = ActivatedRouteSnapshot.queryParams['id'];
            console.log("id",id)
            return `routing/usecase1/${id}/review`;
        },
        pathMatch: 'full',
    },
    {
        path: 'form-concept',
        loadComponent: () => import('../../projects/domains/form-concept/form-concept').then(m => m.FormConcept),
    },
    {
        path: 'http-client',
        loadComponent: () => import('../../projects/domains/http-client/http-client-case').then((m) => m.HttpClientCase),
    },
    {
        path: 'program-render',
        loadComponent: () => import('../../projects/domains/program-render/program-render').then((m => m.ProgramRender)),
        title: 'Program Render',
    },
    {
        path: 'signal_concept',
        loadComponent: () => import('../../projects/domains/signal-concepts/signal-concepts').then(m => m.SignalConcepts),
    },
    {
        path: 'home',
        loadComponent: () => import('../../projects/domains/home/view/view').then((m => m.Home)),
        title: 'Home',
       
    },
    {
        path: 'card',
        canActivate: [authGuard],
        loadComponent: () => import('@feature-card/feature-card-list').then((m => m.FeatureCardList)),
        title: titleResolver,
        resolve: dataResolver,
        data: { feature: 'card'},
         children: [
            {
                path: ':id',
               loadComponent: () => import('../../projects/domains/shared/no-found/no-found').then(m => m.NoFound),
            }
        ]
    },
    {
        path: 'routing',
        loadChildren: () => import('../../projects/domains/routing/routing.route').then((m) => m.RoutingRoutes),
    },
    {
        path: 'todo-list',
        loadComponent: () => import('../../projects/domains/todo-list/todo-list').then((m) => m.ToDoList),
    },
    {
        path: '**',
        loadComponent: () => import('../../projects/domains/shared/no-found/no-found').then(m => m.NoFound),
        title: '404 Error',
    }
];
