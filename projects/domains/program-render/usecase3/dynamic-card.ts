import { NgComponentOutlet } from '@angular/common';
import { Component, TemplateRef, viewChild, ViewContainerRef, inject, computed } from '@angular/core';

@Component({
    template: `
    <div class="cardWrapper">
        <ng-content/>
    </div>
    `
})
export class CardWrapper {}

@Component({
    selector: 'dynamic-card',
    imports: [NgComponentOutlet],
    template: `
        <ng-container *ngComponentOutlet="cardComponent; content: cardContent()" />

        <ng-template #ContentTemplate>
            <h3>Dynamic Card</h3>
            <p> This content is projected into the card </p>
        </ng-template>
    `,
})
export class DynamicCard {
    private vcr = inject(ViewContainerRef);
    cardComponent = CardWrapper;

    dynamicContent = viewChild<TemplateRef<unknown>>('ContentTemplate');

    cardContent = computed(() => {
        const template = this.dynamicContent();
        if (!template) {
            return [];
        }
        return [this.vcr.createEmbeddedView(template).rootNodes];
    })
}