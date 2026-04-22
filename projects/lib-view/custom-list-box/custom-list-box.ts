import { ChangeDetectionStrategy, Component, ElementRef, inject, input } from '@angular/core';
import { BaseListBox } from '../../lib-common/base/list-box';

@Component({
    selector: 'custom-list-box',
    templateUrl: './custom-list-box.html',
    styleUrl: './custom-list-box.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '(click)': 'focusActiveOption()',
    }
})

export class  CustomListBox extends BaseListBox {
    public readonly disable = input.required();
    focusActiveOption() {
        console.log('Parent Class calling');
        console.log(this.value());
    }

    override ngOnInit(): void {
        console.log('child class ngOnInit');
        super.ngOnInit();
    }

    constructor(element: ElementRef) {
        //const element = inject(ElementRef);
        super(element)
    }
}