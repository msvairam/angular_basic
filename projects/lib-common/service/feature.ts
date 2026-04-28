import { Injectable } from '@angular/core';

@Injectable()
export class Feature {
    role = [
        'admin',
        'reviewer',
    ];

    public hasFeatureFlag(flag: string) {
        return this.role.includes(flag);
    }
}