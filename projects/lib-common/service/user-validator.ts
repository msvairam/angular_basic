import { Injectable, inject } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { map, switchMap, timer } from 'rxjs';
import { UserData } from './user';

@Injectable({
    providedIn: 'root',
})
export class UserValidator {
    private readonly user = inject(UserData);

    validator() {
        return (control: AbstractControl) => 
            timer(400)
            .pipe(
                switchMap(() => this.user.getUser(control.value)),
                map(isTaken => isTaken ? { userNameTaken: true } : null)
            )
    }
}