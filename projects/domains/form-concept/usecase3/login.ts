import { Component, inject, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { UserValidator } from '../../../lib-common/service/user-validator';
import { UserData } from '../../../lib-common/service/user';

interface iLoginForm {
    username : FormControl<string>,
    password?: FormControl<string>,
    confirmPassword?: FormControl<string>,
}

// Simple validator function
export function noSpaceValidator(control: AbstractControl): ValidationErrors | null {
    return /\s/.test(control.value) ? { noSpace: true } : null;
}

export function strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const errors: Record<string, boolean> = {};

    if (value.length < 8) errors['minLength'] = true;
    if(/\s/.test(value)) errors['space'] = true;
    if (!/[A-Z]/.test(value)) errors['uppercase'] = true;
    if (!/[a-z]/.test(value)) errors['lowercase'] = true;
    if (!/[0-9]/.test(value)) errors['numerics'] = true;
    if(!/[@#$%^&*!]/.test(value)) errors['specialChar'] = true;

    return Object.keys(errors).length > 0 ? { PassValid: errors } : null;
}

export function confirmPasswordValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password');
    const confirmPass = group.get('confirmPassword');

    if (password?.value != confirmPass?.value){
        confirmPass?.setErrors({ passwordMismatch: true })
        return { passwordMismatch: true };
    } else {
        confirmPass?.setErrors(null);
        return null;
    }
}

@Component({
    selector: 'app-login',
    standalone: true,
    template: `
    <form [formGroup]="loginForm">
        <label for="username"> Username</label>
        <input type="text" name="username" formControlName="username"/><br/>
        @if(loginForm.get('username')?.invalid && loginForm.get('username'); as username) {
            @if(loginForm.get('username')?.errors?.['noSpace']) {
                <p style="color:red">Space not Allowed</p> 
            }
            @if(username?.errors?.['userNameTaken']) {
                <p style="color: green">User Name taken</p>
            }

        }
         @if(loginForm.contains('password') && loginForm.get('password'); as pass) {
            <label for="password">Password</label>
            <input type="password" name="password" formControlName="password"><br/>

            @if (pass?.invalid && pass?.touched) {
                @if (pass?.errors?.['PassValid']; as passValid) {
                    @if (passValid['minLength']) {
                        <p style="color:red"> Minimum 8 Character</p>
                    }
                    @if (passValid['space']) {
                        <p style='color:red'>No Space Allowed</p>
                    }
                    @if (passValid['uppercase']) {
                         <p style='color:red'>At least one uppercase letter</p>
                    }
                    @if (passValid['lowercase']) {
                         <p style='color:red'>At least one lowercase letter</p>
                    }
                    @if (passValid['numerics']) {
                         <p style='color:red'>At least one Number</p>
                    }
                      @if (passValid['specialChar']) {
                         <p style='color:red'>At least one special character</p>
                    }
                }
            }
        }
        @if(loginForm.contains('confirmPassword') && loginForm.get('confirmPassword'); as confirm) {
            <br/>
            <label for="confirmPassword" role="confirmPassword">Confirm Password</label>
            <input type="password" name="confirmPassword" formControlName="confirmPassword" />
            @if(confirm.invalid && confirm.touched) {
                @if(confirm?.errors?.['passwordMismatch']) {
                    <p style='color: red;'>Mismatched Password</p>
                }
            }
            <br/>
        }
        <button (click)="loginSubmit()" [disabled]="!loginForm.valid">Submit</button>
        <button (click)="passwordControlRemove()">Forget Password</button>
        <button (click)="passwordControlAdd()">Back to Login</button>
</form>
    `,
    imports: [ReactiveFormsModule],
    providers: [UserValidator, UserData],
})
export class Login implements AfterViewInit {

    private readonly cd = inject(ChangeDetectorRef);
    private readonly userValidator = inject(UserValidator);

    protected readonly loginForm = new FormGroup<iLoginForm>({
        username: new FormControl('', { nonNullable: true, validators: [noSpaceValidator], asyncValidators: this.userValidator.validator() }),
        password: new FormControl('',  { nonNullable: true, validators: [ Validators.required, strongPasswordValidator] }),
        confirmPassword: new FormControl('', { nonNullable: true, validators: [  Validators.required ] } ), 
    },
    { validators: confirmPasswordValidator })

    protected loginSubmit(): void {
        console.log(this.loginForm.getRawValue());
    }

    protected passwordControlRemove(): void {
        this.loginForm.removeControl('password');
        this.loginForm.removeControl('confirmPassword');
        this.loginForm.markAllAsTouched();
        this.loginForm.markAllAsDirty();
        this.cd.detectChanges();
    }

    protected passwordControlAdd() {
        this.loginForm.addControl('password', new FormControl('', { nonNullable: true, validators: [Validators.required, strongPasswordValidator] }));
        this.loginForm.addControl('confirmPassword', new FormControl('', { nonNullable: true, validators: [Validators.required] }));
    }

    ngAfterViewInit() {
        this.loginForm.valueChanges
        .subscribe((data) => {
            console.log(this.loginForm.controls);
            console.log(data);
        })
    }


}