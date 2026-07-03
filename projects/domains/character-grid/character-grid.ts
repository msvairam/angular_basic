import { Component, ChangeDetectionStrategy, inject, computed, effect, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling'

import { GridState } from './grid-state';
import { GridRow } from './grid-row';

@Component({
    selector: 'app-character-gird',
    imports: [GridRow, ScrollingModule],
    template: `
        @if(rows().length > 0) {
            <div class="grid-shell">
                <cdk-virtual-scroll-viewport [itemSize]="20" class="viewport"
                    (scrolledIndexChange)="onScrollIndex($event)"
                >
                    <div class="grid-items">
                        <app-grid-row *cdkVirtualFor="let row of rows();" [character]="row" />
                    </div>
                </cdk-virtual-scroll-viewport>
            </div>
        }
    `,
    styles: `
    :host {
        display: block;
        height: 100%;
    }

    .grid-shell {
        height: 100dvh;
        padding: 16px;
        box-sizing: border-box;
        overflow: hidden;
    }

    .viewport {
        height: 100%;
        width: 100%;
        overflow-y: auto;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        background: #f8fafc;
    }

    .grid-items {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 16px;
        padding: 8px;
    }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterGrid {
    private readonly cd = inject(GridState);
    @ViewChild(CdkVirtualScrollViewport) private viewport?: CdkVirtualScrollViewport;

    protected totalPages = computed(() => this.cd.totalPages());
    protected isAtEnd = false;
    private wasAtEnd = false;

    onScrollIndex($event: number) {
        const viewport = this.viewport;
        if (!viewport) {
            return;
        }

        const totalItems = viewport.getDataLength();
        const bottomOffset = viewport.measureScrollOffset('bottom');
        const nearBottom = totalItems > 0 && bottomOffset <= 13;

        if (nearBottom && !this.wasAtEnd) {
            this.wasAtEnd = true;
            this.isAtEnd = true;
            console.log('reached end');
        } else if (!nearBottom) {
            this.wasAtEnd = false;
            this.isAtEnd = false;
        }

        console.log('scroll index:', $event);
        console.log('bottom offset:', bottomOffset);
        console.log('total items:', totalItems);
        console.log('reached end:', this.isAtEnd);
    }

    protected rows = computed(() => this.cd.rows());

    constructor() {
        effect(() => {
            console.log(this.rows());
            console.log(this.totalPages());
        })
    }
}