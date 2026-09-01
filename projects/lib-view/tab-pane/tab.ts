import { Component, ChangeDetectionStrategy, input, inject, computed } from '@angular/core';
import { TabPane } from './tab-pane';

@Component({
    selector: 'app-tab',
    template: `
        @if (visible()) {
            <div class="tab">
                <h2>{{ title() }}</h2>
                <ng-content></ng-content>
            </div>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tab {
    public title = input.required<string>();
    private readonly pane = inject(TabPane);

    protected readonly visible = computed(() => this.pane.currentTab() === this)
}