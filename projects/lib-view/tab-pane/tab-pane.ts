import { Component, ChangeDetectionStrategy, contentChildren, model, computed } from '@angular/core';
import { toObservable, outputFromObservable } from '@angular/core/rxjs-interop';
import { scan } from 'rxjs/operators';
import { Tab } from './tab';

@Component({
    selector: 'app-tab-pane',
    template: `
    
        <div class="pane">
            <div class="nav" role="group">
                @for(tab of tabs(); track tab) {
                    <button
                        [class.secondary]="tab === currentTab()"
                        (click)="activate($index)"
                        >
                        {{ tab.title() }}
                    </button>
                }
            </div>
            <article>
                <ng-content/>
            </article>
        </div>

    <ng-content />`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabPane {
    protected readonly tabs = contentChildren(Tab, { descendants: true });
    protected current = model(0);

    public readonly currentTab = computed(() => this.tabs()[this.current()]);


    private $tabChanged = toObservable(this.current)
        .pipe(
            scan(
                (acc, active) => ({active, previous: acc.active}),
                { active: -1, previous: -1 }
            )
        )

    public tabChanged = outputFromObservable(this.$tabChanged);

    activate(index: number): void {
        this.current.set(index);
    }
}