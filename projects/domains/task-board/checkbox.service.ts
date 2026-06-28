import { computed, Injectable, signal } from '@angular/core';
import { Category } from './category.model';

const INITIAL_DATA: Category[] = [
  {
    id: 1, name: 'Electronics', checked: false, indeterminate: false,
    children: [
      {
        id: 2, name: 'Phones', checked: false, indeterminate: false,
        children: [
          { id: 5, name: 'Android', checked: false, indeterminate: false, children: [] },
          { id: 6, name: 'iOS',     checked: false, indeterminate: false, children: [] }
        ]
      },
      {
        id: 3, name: 'Laptops', checked: false, indeterminate: false,
        children: [
          { id: 7, name: 'Windows', checked: false, indeterminate: false, children: [] },
          { id: 8, name: 'MacOS',   checked: false, indeterminate: false, children: [] },
        ]
      },
      { id: 4, name: 'Accessories', checked: false, indeterminate: false, children: [] }
    ]
  }
];

@Injectable()
export class CheckBoxService {
    private _tree = signal<Category[]>(INITIAL_DATA);
    public tree = this._tree.asReadonly();
 
    public toggle(id: number, checked: boolean) {
        this._tree.update(tr => 
          tr
            .map(r => this.setAllNodeSelect(r, id, checked))
            .map((r) => this.syncParent(r)),
        );
    }

    readonly checkedIds = computed(() => this.collectionSelected(this._tree()));

    // --- pure reducer for parent to child nodes
    private setAllNodeSelect(node: Category, id: number, checked: boolean): Category {
      if(node.id == id) return this.setAllSelect(node, checked);
      return { ...node, children: node.children.map((r) => this.setAllNodeSelect(r, id, checked)) };
    }

    private syncParent(node: Category): Category {
      if(node.children.length < 1) return node;

      const children = node.children.map((r) => this.syncParent(r));
      const isAllChecked = children.every((n) => n.checked && !n.indeterminate);
      const nonChecked = children.every((n) => !n.checked && !n.indeterminate);
      return {
        ...node,
        checked: isAllChecked,
        indeterminate: !isAllChecked && !nonChecked,
        children,
      }
    }

    private setAllSelect(node: Category, checked: boolean): Category {
      return {
        ...node,
        checked,
        indeterminate: false,
        children: node.children.map((r) => this.setAllSelect(r, checked)),
      }
    }

    private collectionSelected(node: Category[]): number[] {
      console.log(node);
      return node.flatMap((n) => {
          const parent = n.checked ? [n.id]: [];
          const kid =  this.collectionSelected(n.children);
              return [...parent, ...kid];
      })
    }
}