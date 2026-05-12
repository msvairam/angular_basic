import { booleanAttribute, Directive, input, TemplateRef, inject, ViewContainerRef, effect } from '@angular/core';

@Directive({
    selector: '[nxUnless]',
    host: {
        '(click)': 'showMesssage()',
    }

})
export class nxUnlessDirective {
    public readonly nxUnless = input.required({transform:  booleanAttribute});

    private readonly templateRef =  inject(TemplateRef);
    private readonly viewContainerRef = inject(ViewContainerRef);

    showMesssage() {
        console.log('show message')
    }

    constructor() {
        effect(() => {
            const visible = this.nxUnless();

            if(visible) {
                this.viewContainerRef.createEmbeddedView(this.templateRef);
            } else if(!visible) {
                this.viewContainerRef.clear();
            }
        })
    }
}