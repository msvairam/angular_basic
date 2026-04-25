import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AppTitleStrategy extends TitleStrategy {
    title = inject(Title);

    updateTitle(snapshot: RouterStateSnapshot): void {
        const pageTitle = this.buildTitle(snapshot) || this.title.getTitle();

        this.title.setTitle(`Feature ${pageTitle}`);
    }

}