import { Directive, input, output } from '@angular/core';

@Directive({
    selector: '[menuBehavior]',
    host: {
        '[attr.id]': 'menuId()',
    }
})
export class MenuBehaviour {
    public readonly menuId = input.required();
    public readonly menuClosed = output();



    constructor() {
        setTimeout(() => {
            this.menuClosed.emit();
        },1000)
    }
}