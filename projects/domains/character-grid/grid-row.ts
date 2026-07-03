import { Component, ChangeDetectionStrategy, input } from '@angular/core';

import { PageResult } from './character';

@Component({
    selector: 'app-grid-row',
    template: `<div class="grid-item"> 
                    @let _character = character();
                    <p>{{_character?.name}}</p>
                    <img src="{{_character?.image}}" alt="{{_character.species}}" />
                </div>`,
    styles: `
        :host {
            display: block;
        }

        .grid-item {
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 12px;
            background: #ffffff;
            box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
        }

        img {
            width: 100%;
            height: 180px;
            object-fit: cover;
            border-radius: 8px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridRow {
    public readonly character = input.required<PageResult>(); 
}