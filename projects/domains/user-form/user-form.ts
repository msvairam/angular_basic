import { Component, ChangeDetectionStrategy, signal, inject, computed } from '@angular/core';

import { userTabs } from './user-form.model';
import { userFormData } from './user-form-data';
import { TabForm } from '../../lib-view/tab-form/tab-form';
import { TabPane } from '../../lib-view/tab-pane/tab-pane';
import { Tab } from '../../lib-view/tab-pane/tab';

@Component({
    selector: 'app-user-form',
    imports: [TabForm, TabPane, Tab],
    providers: [userFormData],
    template: `
       
        <app-tab-pane (tabChanged)="onTabChanged($event)">
            <app-tab title="1st tab"> Lorem, ipsum dolor sit amet ... </app-tab>
            <app-tab title="2nd tab"> Sammas ergo gemma, ipsum dolor ... </app-tab>
            <div class="danger-zone">
                <app-tab title="3nd tab"> Gemma ham ipsum dolor sit ... </app-tab>
            </div>
        </app-tab-pane>
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

protected onTabChanged($event: unknown) {
    console.log($event);
}

}