import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { FormField } from '@angular/forms/signals';

import { userFormData } from '../user-form-data';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [ FormField ],
    template:  `
    
    <form>
          @let _profileForm = profileForm();
        <div class="field">
            <label for="firstname">First Name</label>
            <input type='text' [formField]="_profileForm.firstname" />

        </div>
          <div class="field">
            <label  for="lastname">Last Name</label>
            <input type='text' [formField]="_profileForm.lastname" />

        </div>
          <div class="field">
            <label for="email">Email</label>
            <input type='email' [formField]="_profileForm.email" />
        </div>
</form>

    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile {
    protected ufd = inject(userFormData);

    protected profileForm = computed(() => this.ufd.userForm.profile );

    public status = computed(() => this.ufd.userForm.profile().valid());

}