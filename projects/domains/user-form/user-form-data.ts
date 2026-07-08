import { Injectable, signal, computed } from '@angular/core';
import { form, required, schema, apply, email, applyEach } from '@angular/forms/signals';

import { UserForm, Profile, Interest, Settings } from './user-form.model';

@Injectable({
  providedIn: 'root',
})
export class userFormData {
  // 1. Single source of truth model signal
  public userModel = signal<UserForm>({
    profile: {
      firstname: '',
      lastname: '',
      email: '',
    },
    interest: {
      topics: ['', ''],
      newsletter: false,
      frequency: '',
    },
    settings: {
      theme: '',
      language: '',
      notification: false,
    },
  });

  private profileSchema = schema<Profile>((path) => {
    required(path.firstname);
    required(path.lastname);
     required(path.email);
    email(path.email);
  });

  private interestSchema = schema<Interest>((path) => {
        applyEach(path.topics, (val) => {
            required(val);
        });
        required(path.newsletter);
  });

  private settingsSchema = schema<Settings>((path) => {
    required(path.theme);
    required(path.language);
  })

  // 2. Define the schema tree with validations
  public userForm = form(this.userModel, (path) => {
    apply(path.profile, this.profileSchema);
    apply(path.interest, this.interestSchema);
    apply(path.settings, this.settingsSchema);
  });
}
