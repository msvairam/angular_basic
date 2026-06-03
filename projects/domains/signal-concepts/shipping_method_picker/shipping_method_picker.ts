import { ChangeDetectionStrategy, Component, effect, linkedSignal, signal } from '@angular/core';

interface ShippingMethod {
    id: number,
    name: string,
}

@Component({
    selector: 'app-shipping-method-picker',
    standalone: true,
    template: `
    <p>Selected Shipping Name: {{ selectedShippingOption().name }}</p>
    <p>Selected Shipping1 Name: {{ selectedShippingOption1().name }}</p>
    <p>Active User Edit Copy: {{ activeUserEditCopy().name }}</p>
    <button (click)="changeShippingMethod()">Change Shipping Method</button>
    <select (change)="changeShippingOption($event)">
        @let options = shippingOption();
        @for(option of options; track option.id) {
            <option [value]="option.id">{{option.name}}</option>
        }
       
    </select>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShippingMethodPicker {
    public readonly shippingOption = signal<ShippingMethod[]>([
        {
            id: 0, name: 'Ground',
        },
        {
            id: 1, name: 'Air',
        },
        {
            id: 2, name: 'Sea',
        }
    ]);

    public readonly activeUser = signal({id: 123, name: 'Morgan', isAdmin: true});

    // Select the first shipping option by default.
    protected readonly selectedShippingOption = linkedSignal<ShippingMethod>(() => this.shippingOption()[1]);

    protected readonly selectedShippingOption1 = linkedSignal<ShippingMethod[], ShippingMethod>({
        // `selectedOption` is set to the `computation` result whenever this `source` changes.
        source: this.shippingOption,
        computation: (newOption, previous) => {
        // If the newOptions contain the previously selected option, preserve that selection.
        // Otherwise, default to the first option.
            return newOption.find(p => p.id === previous?.value.id) ?? newOption[0];
        },
    });

    protected readonly activeUserEditCopy = linkedSignal(() => this.activeUser(), {
        equal: (a, b) => a.id == b.id
    })

    changeShippingMethod() {
        /*this.shippingOption.update((val) => 
            val.map((el) => {
                if(el.id == 0) el.name ='OnRoad'
                return el;
            })
        ); */
        this.shippingOption.set([
        {
            id: 3, name: 'OnRoad',
        },
        {
            id: 1, name: 'Air',
        },
        {
            id: 2, name: 'Sea',
        }
    ])
    this.activeUser.set({id: 254, name: 'Morgan1', isAdmin: true})
    }

    changeShippingOption(event: Event) {
        const target = event.target as HTMLSelectElement;
        const index = target.value as unknown;
        this.selectedShippingOption.set(this.shippingOption()[index as number]);
    }

    constructor() {
        effect(() => {
            console.log(this.shippingOption());
        })
    }

}