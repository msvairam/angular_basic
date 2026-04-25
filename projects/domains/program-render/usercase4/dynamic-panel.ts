import { NgComponentOutlet } from "@angular/common";
import { Component, InjectionToken, Injector, inject } from "@angular/core";

export const THEME_DATA =  new InjectionToken('THEME_DATA', {
    factory: () => 'light',
});


@Component({
    template: `<h1 [class]="theme">THEME</h1>`,
    styles: `
    .light {
        color: blue;
    }
    .dark {
        color: red;
    }
    `
})
export class ThemePanel {
    theme = inject(THEME_DATA);
}

@Component({
    selector: 'dynamic-panel',
    imports: [NgComponentOutlet],
    template: `
        <ng-container *ngComponentOutlet='themePanel; injector: customInject ' />
    `
})
export class DynamicPanel {
    themePanel = ThemePanel;

    customInject = Injector.create({
        providers: [{provide: THEME_DATA, useFactory: () => 'dark'}]
    });

}