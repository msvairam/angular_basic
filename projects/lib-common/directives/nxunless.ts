import { Directive, input, inject, TemplateRef, ViewContainerRef, effect, HostListener, booleanAttribute } from '@angular/core';
import { TitleStrategy } from '@angular/router';

@Directive({
    selector: '[nxUnless]',
    host: {
        '(click)': 'showMessage()'
    }
})
export class nxUnlessDirective {
    public readonly nxUnless = input.required({transform: booleanAttribute})

    private readonly templateRef = inject(TemplateRef);
    private readonly viewContainerRef = inject(ViewContainerRef);

    protected showMessage() {
        console.log('test');
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