import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { validate } from '@angular/forms/signals';

@Component({
    selector: 'app-profile-editor',
    template: `
    
    <form [formGroup]='formGroup'>
        <input type="text" formControlName='firstName' />
        <input type="text" fromControlName='lastname' />
        <div formGroupName='address'>
            <input type="text" formControlName='street' />
            <input type="text" formControlName='city' />
        </div>
    </form>

    `,
    imports: [ReactiveFormsModule],
})
export class ProfileEditor {
    protected readonly formGroup = new FormGroup({
        firstName: new FormControl([Validators.required, Validators.pattern('^[0-9]*$')]),
        lastName: new FormControl(),
        address: new FormGroup({
            street:  new FormControl(),
            city: new FormControl(),
        })
    });

    ngAfterViewInit() {
        this.formGroup.get('address.street')?.setValidators([Validators.required]);
        this.formGroup.updateValueAndValidity();
        this.formGroup.get('address.street')?.clearValidators();
        this.formGroup.updateValueAndValidity();
    }
}