import { Directive, input, signal, ElementRef, inject, model } from "@angular/core";

@Directive({
    selector: '[appHighlight]',
    host: {
        '(mouseenter)': 'changeBackgroundColor(this.appHighlight() || this.defaultColor())',
        '(mouseleave)': 'changeBackgroundColor(null)',
    }
})
export class HightLightDirective {

    private readonly el = inject(ElementRef);

    public readonly appHighlight = input<string | null>('');

    public readonly defaultColor = input<string>('');

    public readonly changeModel = model('');


   // protected readonly backgroundColor = signal<string | null>(null);

    protected changeBackgroundColor(color: string | null) {
        console.log(this.changeModel());
        this.el.nativeElement.style.backgroundColor = color;
       // this.el.nativeElement.style.color= color ?? 'red';
    }


} 