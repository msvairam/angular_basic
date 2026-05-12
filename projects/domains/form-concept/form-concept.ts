import { Component } from'@angular/core';
import { NameEditor } from './usecase1/name-editor';
import { ProfileEditor } from './usecase2/profile-editor';

@Component({
    imports: [NameEditor, ProfileEditor],
    template: `
        <app-name-editor/>
        <app-profile-editor />
    `,
})
export class FormConcept {

}