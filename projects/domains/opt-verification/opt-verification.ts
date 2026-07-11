import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

import { OTPInput } from '../../lib-view/otp-input/otp-input';
import { OTPInputData } from '../../lib-view/otp-input/otp-input-data';

@Component({
    selector: 'app-opt-verify',
    imports: [OTPInput],
    providers: [OTPInputData],
    template: `
    <h1>OPT Verification</h1>
        <app-otp-input [length]="length()" />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OPTVerification {
    protected length = signal(6);
}