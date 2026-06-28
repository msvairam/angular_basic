import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';

import { CheckBoxService } from './checkbox.service';
import { TreeNode } from '../../lib-view/tree-node/tree-node';

@Component({
    selector: 'app-task-board',
    imports: [TreeNode],
    providers: [CheckBoxService],
    template: `
        <div class='container'>
            @for(category of categories(); track category.id) {
                <app-tree-node 
                    [node]="category"
                    (nodeToggle)="cvs.toggle($event.id, $event.checked)"
                />
            }
        </div>
        <div class="result-container">
            <span>Selected Ids: {{ cvs.checkedIds().join(',') }}</span>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskBoard {
    protected cvs = inject(CheckBoxService);
    protected categories = computed(() => this.cvs.tree());
}