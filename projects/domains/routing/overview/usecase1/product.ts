import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet, Router, ActivatedRoute, RouterLinkActive, isActive } from '@angular/router';

@Component({
    template: `
    <h1>Products {{page()}}</h1>
        <nav>
        <ul>
            <li><a routerLink="info" routerLinkActive="active-button" [routerLinkActiveOptions]="{exact: true}">Info</a></li>
            <li><a routerLink="review" routerLinkActive="active-button">Review</a></li>

            <h1>Sample Links</h1>
            <div><a href="/review">Review without routerLink</a></div>
            <div><a [routerLink]="['review']"> Router link with Array Format</a></div>
            <div><a routerLink="review">Router</a></div>
        </ul>
        </nav>
        <button (click)="navigationToParent()">RedirectTo Parent</button>
        <button (click)="navigationToReview()">RedirectTo review</button>
        <p>{{reviewActive()}}</p>
        <button (click)="navigateByUrl()">router.navigateByUrl('/card')</button>
    <router-outlet/>`,
    imports: [RouterOutlet, RouterLink, RouterLinkActive]
})
export class Product {
    readonly router = inject(Router);
    readonly route = inject(ActivatedRoute);

    readonly page = signal('');

    readonly reviewActive = isActive('/review', this.router)
    

    navigationToParent() {
        this.router.navigate(['.'], {queryParamsHandling: 'merge', relativeTo: this.route });
    }

    navigationToReview() {
        this.router.navigate(['..', 45, 'review'], { queryParams: { category: 'Shoe' }, relativeTo: this.route });
    }

    navigateByUrl() {
        this.router.navigateByUrl('/card', { replaceUrl: true, browserUrl: 'product-card' });
    }

    constructor() {
        console.log(this.route.snapshot.params['id']);

        this.route.params.subscribe((param) => {
            this.page.set(param['id']);
        })
    }
}