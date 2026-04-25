import { Component, signal } from '@angular/core';
import { CustomDialog } from './usecase1/custom-dialog';
import { ProfileView } from './usercase2/profile-view';
import { DynamicCard } from './usecase3/dynamic-card';
import { DynamicPanel } from './usercase4/dynamic-panel';
import { OuterContainer } from './usecase5/inner-item';
import { AdminSettings } from './usecase6/admin-settings';

@Component({
    selector: 'program-render',
    imports: [CustomDialog,
         ProfileView, 
         DynamicCard, 
         DynamicPanel,
        OuterContainer,
        AdminSettings,
    ],
    template: `<h1>Program Render</h1>
    <custom-dialog [user]="user()"/>
     <button (click)="changeBio()">Change</button>
    <profile-view /> 
    <dynamic-card />
    <dynamic-panel />
    <outer-container />
    <admin-settings />
   `,
})
export class ProgramRender {
    readonly user = signal({
        isAdmin: false,
        name: '',
    });

    changeBio() {
        this.user.update(val => ({
            ...val,
            isAdmin: !val.isAdmin,
            name: 'vairamuthu',
    }))
    }

    
}