import { ChangeDetectionStrategy, Component, input, output, computed } from '@angular/core';
import { Category } from '../../domains/task-board/category.model';
import { Indeterminate } from '../../lib-common/directives/indeterminate';

@Component({
    selector: 'app-tree-node',
    imports: [Indeterminate],
    standalone: true,
    template: `
        @let tree = node();
        <div class="node">
            <input type="checkbox"
                [checked]= tree.checked
                (change)= "toggle($event)"
            >
            <span>{{ tree.name }}</span>
        </div>
        @if(tree.children.length > 0) {
            <div class="children">
                @for(node of tree.children; track node.id) {
                    <app-tree-node 
                        [node]= "node"
                        (nodeToggle)="nodeToggle.emit($event)"
                    />

                }
            </div>
        }
    `,
    styles: `
        .node { display: flex; gap: 10px; align-items: center; padding: 4px 0;}
        .label   { font-size: 14px; cursor: pointer; }
        .children { margin-left: 24px; border-left: 1.5px solid #e2e2e2; padding-left: 12px; }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeNode {
    public readonly node = input.required<Category>();
    public readonly nodeToggle = output<{id: number, checked: boolean}>();

    private id = computed(() => this.node().id);

    protected toggle(event: Event) {
        const checked = (event.target as HTMLInputElement).checked;
        this.nodeToggle.emit({id: this.id(), checked });
    }
}