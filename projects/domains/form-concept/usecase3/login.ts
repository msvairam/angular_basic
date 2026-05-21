import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';

interface iLoginForm {
    email : FormControl<string>,
    password?: FormControl<string>,
}

@Component({
    selector: 'app-login',
    standalone: true,
    template: `
    <form [formGroup]="loginForm">
        <label for="email"> Email</label>
        <input type="text" name="email" formControlName="email"/><br/>
         @if(loginForm.contains('password')) {
            <label for="password">Password</label>
            <input type="text" name="password" formControlName="password"><br/>
        }
        <button (click)="loginSubmit()">Submit</button>
        <button (click)="passwordControlRemove()">Forget Password</button>
        <button (click)="passwordControlAdd()">Back to Login</button>
</form>
    `,
    imports: [ReactiveFormsModule],
})
export class Login {

    private readonly cd = inject(ChangeDetectorRef);

    protected readonly loginForm = new FormGroup<iLoginForm>({
        email: new FormControl('example@gmail.com',{ nonNullable: true }),
        password: new FormControl('', { nonNullable: true }),
    })

    protected loginSubmit(): void {
        console.log(this.loginForm.getRawValue());
    }

    protected passwordControlRemove(): void {
        this.loginForm.removeControl('password');
        this.loginForm.markAllAsTouched();
        this.loginForm.markAllAsDirty();
        this.cd.detectChanges();
    }

    protected passwordControlAdd() {
        this.loginForm.addControl('password', new FormControl('', { nonNullable: true }));
    }


}