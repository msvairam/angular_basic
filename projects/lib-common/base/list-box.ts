import { ChangeDetectionStrategy, Component, ElementRef, inject, input } from '@angular/core';

@Component({
    selector: 'base-listbox',
    template: ``,
    changeDetection:ChangeDetectionStrategy.OnPush,
    host: {
        '(click)': 'handleKey()',
    }
})
export class BaseListBox {
    public readonly value =  input.required<string>();
    protected isInitialized = false;

    protected handleKey() {
        console.log(this.element);
        console.log('base class calling');
    }

    ngOnInit() {
        this.isInitialized = true;
        console.log('Parent Class ngOnInit');
    }

    constructor(protected element: ElementRef) {

    }
}