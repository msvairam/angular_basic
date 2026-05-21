import { Component } from'@angular/core';
import { NameEditor } from './usecase1/name-editor';
import { ProfileEditor } from './usecase2/profile-editor';
import { Login } from './usecase3/login';

@Component({
    imports: [NameEditor, ProfileEditor, Login],
    template: `
        <app-name-editor/>
        <app-profile-editor />
        <app-login />
    `,
})
export class FormConcept {

}