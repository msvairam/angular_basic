import { Component, ChangeDetectionStrategy, signal, inject, computed } from '@angular/core';

import { userTabs } from './user-form.model';
import { userFormData } from './user-form-data';
import { TabForm } from '../../lib-view/tab-form/tab-form';

@Component({
    selector: 'app-user-form',
    imports: [TabForm],
    providers: [userFormData],
    template: `
        <app-tab-form [tabs]='tabs()' [valid]="this.ufd.userForm().valid()" (submitForm)="submit()"/>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserForm {
    protected ufd = inject(userFormData);

    protected readonly tabs = signal<userTabs>([
    {
        id: 1,
        name: 'profile',
        label: 'Profile',
        component: () => import('./profile/profile').then(m => m.Profile),
        status: computed(() => this.ufd.userForm.profile().valid()),
    },
    {
        id: 2,
        name: 'interest',
        label: 'Interest',
        component: () => import('./interest/interest').then(m => m.Interest),
         status: computed(() => this.ufd.userForm.interest().valid()),
    },
     {
        id: 3,
        name: 'settings',
        label: 'Settings',
        component: () => import('./settings/settings').then(m => m.Settings),
        status: computed(() => this.ufd.userForm.settings().valid()),
    },
]);

protected submit() {
    console.log(this.ufd.userForm().value());
}

}