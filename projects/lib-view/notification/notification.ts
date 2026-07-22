import { Component, ChangeDetectionStrategy, input, computed, inject } from '@angular/core';
import { iNotification } from './notification-model';
import { NotificationData } from './notification-data';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.html',
    styleUrl: './notification.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Notification {

    private nd = inject(NotificationData);

    public readonly params = input.required<iNotification>();

    private readonly id = computed(() => this.params().id ?? '');

    protected removeNotification() {
        const id = this.id();
        this.nd.removeNotification(id);
    }
}