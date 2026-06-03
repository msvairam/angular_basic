import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ShippingMethodPicker } from './shipping_method_picker/shipping_method_picker';

@Component({
    selector: 'app-signal-concepts',
    standalone: true,
    imports: [ShippingMethodPicker],
    template: `<app-shipping-method-picker />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignalConcepts {

}