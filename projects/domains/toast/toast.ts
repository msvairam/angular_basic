import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { Notification } from '../../lib-view/notification/notification';
import { NotificationData } from '../../lib-view/notification/notification-data';

@Component({
    selector: 'app-toast',
    imports: [Notification],
    template: `
        <div class='toast-container'>
            @for(notification of notifications(); track $index) {
                <app-notification [params]="notification"/>
            }
        </div>
    `,
    styles: `
        .toast-container {
            position: absolute;
            bottom: 10px;
            right: 10px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toast {
    private readonly nd = inject(NotificationData);
      protected readonly notifications = computed(() => this.nd._notifications());
}