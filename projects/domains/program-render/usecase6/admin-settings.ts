import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AdvanceSettings } from './advance-settings';
import { NgComponentOutlet } from '@angular/common';

@Component({
    selector: 'admin-settings',
    imports: [NgComponentOutlet],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    template:  `
    <section>
        <p>Basic Settings
    </section>
    <section>
        <p>Advance Settings</p>
        @if (!advanceSettings) {
         <button (click)="LoadAdvanceSettings();">Advance Settings</button>
        }
    </section>
    <some-unknown-component />
    <ng-container *ngComponentOutlet="advanceSettings" />
   
    `
})
export class AdminSettings {

    advanceSettings !: {new(): AdvanceSettings | undefined};

    async LoadAdvanceSettings() {
        const { AdvanceSettings } = await import('./advance-settings');
        this.advanceSettings = AdvanceSettings;
    }
}