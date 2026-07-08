import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { FormField } from '@angular/forms/signals';

import { userFormData } from '../user-form-data';

@Component({
    selector: 'app-interest',
    imports: [FormField],
    template:  `
    <form>
         <div class="field">
             <label for="topics">Topics</label>
          @let _interestForm = interestForm();
          @for(topic of _interestForm.topics; track $index) {
            
            <input type='text' [formField]="topic" />
          }
        </div>
        <div class="field">
            <label for="newsletter">News Letter</label>
            <input type='checkbox' [formField]="_interestForm.newsletter" />

        </div>
          <div class="field">
            <label for="frequency">Frequency</label>
            <input type='text' [formField]="_interestForm.frequency" />

        </div>
</form>

    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Interest {
    private ufd = inject(userFormData);
  
    protected interestForm = computed(() => this.ufd.userForm.interest );

    public status = computed(() => this.ufd.userForm.interest().valid());
}