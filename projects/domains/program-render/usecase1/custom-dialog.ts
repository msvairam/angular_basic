import { NgComponentOutlet } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
    template: `<h1>Admin Bio</h1>`,
})
export class AdminBio {}

@Component({
    template: `<h1>Standard Bio</h1>`,
})
export class StandardBio {
    public getValue() {
        console.log('It is standardBio Event from custom dialog');
    }
}

@Component({
    selector: 'custom-dialog',
    imports: [NgComponentOutlet],
    template: `
        <ng-container *ngComponentOutlet="getBioComponent()" />
        <ng-container [ngComponentOutlet]="standbio" #outlet="ngComponentOutlet" />

        <button (click)="outlet.componentInstance?.getValue()">Click</button>

    `,
})
export class CustomDialog {
    user = input({
        isAdmin: false,
        name: 'vairamuthu',
    });

    standbio = StandardBio;
    

    getBioComponent() {
        return this.user().isAdmin ? AdminBio : StandardBio;
    }
    
}