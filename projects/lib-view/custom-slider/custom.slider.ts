import { Component, signal } from '@angular/core';

@Component({
    selector: 'custom-slider',
    template: `<div>Slider</div>`,
    host: {
        'role': 'slider',
        '[attr.aria-valuenow]': 'value',
        '[class.active]': 'isActive()',
        '[style.background]': `hasError() ? 'red': 'green'`,
        '[tabIndex]': `disable() ? -1: 0`,
        '(keydown)': 'updatevalue($event)',

    }
})
export class CustomSlider {
    protected value: number = 0;

    protected readonly isActive = signal(true);

    protected readonly hasError = signal(false);

    protected readonly disable = signal(false);

    protected updatevalue(event: KeyboardEvent) {
        console.log(event);
    }
}

