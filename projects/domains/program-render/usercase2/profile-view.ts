import { NgComponentOutlet } from '@angular/common';
import { Component, input, signal } from '@angular/core';

@Component({
    template: `
        <h1>User Name : {{ userName() }}</h1>
        <p>Role: {{ role() }}</p>
    `,
})
export class UserGreeting {
    userName = input<string>('');
    role = input<'admin' | 'guest'>('guest');
}

@Component({
    selector: 'profile-view',
    imports: [ NgComponentOutlet ],
    template: `
    <ng-container *ngComponentOutlet="greetComponent; inputs: greetingInput()">
    `,
})
export class ProfileView {
    greetComponent =  UserGreeting;
    greetingInput = signal({ userName: 'vairamuthu', role: 'admin' })
}
