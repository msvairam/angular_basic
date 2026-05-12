import { Directive, inject, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appConvertToInt]',
    host: {
        '(mouseleave)': 'onConvertToInt()',
    }
})
export class ConvertToInt {
    private readonly el = inject(ElementRef);
    private readonly control = inject(NgControl);

    public onConvertToInt() {
        const val = this.el.nativeElement.value;
       
        console.log(this.control.control?.value);
        if (val) {
             const initVal = parseInt(val, 10);
             this.el.nativeElement.value = isNaN(initVal)? '' : initVal.toString();
        }
    }
}