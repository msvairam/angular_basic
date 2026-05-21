import { Directive, input, ElementRef, inject, model, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appHighlight]',
    host: {
        '(mouseenter)': 'changeBackgroundColor(this.appHighlight() || this.defaultColor())',
        '(mouseleave)': 'changeBackgroundColor(null)',
    }
})
export class HightLightDirective {

    private readonly el = inject(ElementRef);
    private readonly renderer = inject(Renderer2);

    public readonly appHighlight = input<string | null>('');

    public readonly defaultColor = input<string>('');

    public readonly changeModel = model('');


   // protected readonly backgroundColor = signal<string | null>(null);

    protected changeBackgroundColor1(color: string | null) {
        console.log(this.changeModel());
        this.el.nativeElement.style.backgroundColor = color;
       // this.el.nativeElement.style.color= color ?? 'red';
    }

    protected changeBackgroundColor(color: string | null): void {
        this.renderer.setStyle(this.el.nativeElement,'backgroundColor', color);
    }


} 