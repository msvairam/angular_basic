import { Directive, inject, input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[select]',
})
export class SelectDirective {
    private readonly templateRef = inject(TemplateRef);
    private readonly viewContainerRef = inject(ViewContainerRef);

    public selectFrom = input.required();

    async ngOnInit() {
        const data =  await this.selectFrom();
        console.log(data);
        this.viewContainerRef.createEmbeddedView(this.templateRef, {
            $implicit: 'test',
        })
    }
}