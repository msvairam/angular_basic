import { Component, inject, ViewContainerRef } from '@angular/core';

@Component({
    template: `This is the Leaf content`,
})
export class LeafContent {}

@Component({
    selector: 'inner-view',
    template: `
    <button (click)="loadComponent()">Load Leaf Content</button>
    `
})
export class InnerView {
    vcr = inject(ViewContainerRef);
    loadComponent() {
        this.vcr.clear(); // We can clear container before
        this.vcr.createComponent(LeafContent); // Continue to append next to button
    }
}

@Component({
    selector: 'outer-container',
    imports: [InnerView],
    template: `
        <p> This is start of the outer container</p>
        <inner-view />
        <p>This is end of outer container</p>
    `
})
export class OuterContainer {}

