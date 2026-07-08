import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';

import { FormField } from '@angular/forms/signals';
import { userFormData } from '../user-form-data';

@Component({
    selector: 'app-settings',
    imports: [FormField],
    template:  `
        @let _settingForm = settingsForm();
        <form>
            <div class="field">
                <label for="theme">Theme</label>
                <select [formField]="_settingForm.theme">
                    <option value='dark'>Dark</option>
                    <option value='light'>Light</option>
                </select>
            </div>
             <div class="field">
                <label for="language">Language</label>
                 <select [formField]="_settingForm.language">
                    <option value='en'>English</option>
                    <option value='ta'>Tamil</option>
                </select>
            </div>
             <div class="field">
                <label for="notification">Nofication</label>
                <input type="checkbox" [formField]="_settingForm.notification"/>
            </div>
        </form>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Settings {
    private ufd =  inject(userFormData);

    protected settingsForm = computed(() => this.ufd.userForm.settings);

    public status = computed(() => this.ufd.userForm.settings().valid());
}