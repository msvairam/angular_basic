import { Directive, ElementRef, inject, effect, input } from '@angular/core';

@Directive({
    selector: 'input[type=checkbox][appIndeterminate]',
})
export class Indeterminate {
    public appIndeterminate = input<boolean>();
    private el = inject(ElementRef);

    constructor() {
        effect(() => {
            this.el.nativeElement.indeterminate.val = this.appIndeterminate();
        })
    }
}