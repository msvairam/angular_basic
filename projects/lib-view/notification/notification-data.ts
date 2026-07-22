import { Injectable, signal } from '@angular/core';
import { iNotification } from './notification-model';

@Injectable({
    providedIn: 'root'
})
export class NotificationData {
    private notifications = signal<iNotification[]>([]);
    public _notifications = this.notifications.asReadonly();

    addNotification(params: iNotification) {
        this.notifications.update(val => [
            ...val,
            {...params},
        ])
    }

    removeNotification(id: number) {
        this.notifications.update(val => [
            ...val.filter((nd) => nd.id != id),
        ])
    }
}