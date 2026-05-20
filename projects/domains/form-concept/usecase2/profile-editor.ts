import { Component, inject, ChangeDetectorRef  } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, Validators, FormBuilder, FormArray } from '@angular/forms';
import { MaskEmailPipe } from '../../../lib-common/pipe/mask-email';

@Component({
    selector: 'app-profile-editor',
    template: `
    <!--<p>Form Status: {{profileForm.Status}}</p>-->
    <form [formGroup]='profileForm' (ngSubmit)="submit()">
        First Name: <input type="text" formControlName='firstName' /><br />
        Last Name: <input type="text" formControlName='lastName' /><br />
        Email: <input type="text" class="form-control" formControlName='userEmail' (blur)="onEmailBlur()" /><br/>
        @if (profileForm.get('userEmail')?.invalid && profileForm.get('userEmail')?.touched) {
            @if(profileForm.get('userEmail')?.errors?.['required']) {
                <p style="color:red">Name is Required</p>
            }
             @if(profileForm.get('userEmail')?.errors?.['email']) {
                <p style="color:red">Email is Invalid</p>
             }
        }
        <br />
        Email: <p>{{profileForm.get('userEmail')?.value ?? ''| maskEmail:1}}</p>
        <div formGroupName='address'><br />
          <h2>Address</h2>
              <label for="street">Street: </label>
                <input type="text" formControlName='street' />
                <label for="city">City: </label>
         <input type="text" formControlName='city' />
        </div>
        <button (click)="addAliases();">+ Add Aliases</button>
         <div formArrayName="aliases">
            <br/>
            @for (alia of aliases.controls; track $index; let i = $index) {
                <label for="alia-{{i}}">Alias - {{i}}</label>
                <input id="alia-{{i}}" type="text" [formControlName]="i" />
                <button (click)="removeAlias(i)">- Remove alias</button>
                <br/>
           
            }
            <br/>
        </div>
        <button [disabled]="!profileForm.valid">Submit</button>
    </form>
    <button id="update" (click)="updateProfile()">Update Profile</button>
    <button id="clear" (click)="clear()">Clear</button>

    `,
    imports: [ReactiveFormsModule, MaskEmailPipe],
})
export class ProfileEditor {
   /* protected readonly profileForm = new FormGroup({
        firstName: new FormControl('',[Validators.required, Validators.pattern('^[A-Za-z]*$')]),
        lastName: new FormControl(),
        address: new FormGroup({
            street:  new FormControl(),
            city: new FormControl(),
        })
    }); */

    private readonly formBuilder = inject(FormBuilder);
    private readonly cd = inject(ChangeDetectorRef);

    protected readonly profileForm  = this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z]*$')]],
        lastName: [''],
        userEmail: ['', [Validators.required, Validators.email]],
        address: this.formBuilder.group({
            street: [''],
            city: [''],
        }),
        aliases: this.formBuilder.array([
            this.formBuilder.control('', [Validators.required]),
            this.formBuilder.control('', []),
        ]),
    })

    get aliases() {
        return this.profileForm.get('aliases') as FormArray;
    }

    protected addAliases(): void {
        this.aliases.push(this.formBuilder.control('', [Validators.required]));
    }

    protected removeAlias(index: number): void {
        this.aliases.removeAt(index);
    }

    protected onEmailBlur() {
       // this.profileForm.get('userEmail')?.markAsTouched();
    }

    protected submit() {
        if(this.profileForm.valid) {
            console.log(this.profileForm.getRawValue());
            console.log(this.profileForm.value);
        }
    }

    protected updateProfile() {
        this.profileForm.patchValue({
            firstName: 'Vairamuthu',
            lastName: 'Masanamuthu',
            userEmail: 'vairam@gmail.com',
            address: {
                street: 'Sengundram Nagar',
                city: 'Madurai',
            }
        });
        this.profileForm.markAllAsTouched();
        this.profileForm.markAllAsDirty();
    }

    protected clear() {
        this.profileForm.reset();
    }

    ngAfterViewInit() {
        this.profileForm.get('address.street')?.setValidators([Validators.required]);
        this.profileForm.updateValueAndValidity();
       // this.profileForm.get('address.street')?.clearValidators();
        //this.profileForm.updateValueAndValidity();
    }

    constructor() {
        this.profileForm.valueChanges
        .pipe(takeUntilDestroyed())
        .subscribe(() => {
            console.log('Trigger Change Detector');
            console.log(this.profileForm.get('userEmail')?.errors);
            this.cd.markForCheck();
        });
    }
}