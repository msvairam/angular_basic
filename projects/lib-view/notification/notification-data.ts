import { Injectable, signal, inject } from '@angular/core';
import { iNotification } from './notification-model';
import { Broadcast } from '../../lib-common/service/broadcast-channel';

const NOTIFICATION_COUNT = 'NOTIFICATION_COUNT';

@Injectable({
    providedIn: 'root'
})
export class NotificationData {
    private channel = inject(Broadcast);

    private notifications = signal<iNotification[]>([]);
    public _notifications = this.notifications.asReadonly();
    private count = signal(Number(localStorage.getItem('notificationCount')));
    public _count = this.count.asReadonly();

    addNotification(params: iNotification) {
        this.count.update(val => val + 1);
        this.channel.send<number>(NOTIFICATION_COUNT, this.count());
        localStorage.setItem('notificationCount', this.count().toString());
        this.notifications.update(val => [
            ...val,
            {...params},
        ])
    }

    removeNotification(id: number) {
        this.count.update(val => val - 1);
         this.channel.send<number>(NOTIFICATION_COUNT, this.count());
         localStorage.setItem('notificationCount', this.count().toString())
        this.notifications.update(val => [
            ...val.filter((nd) => nd.id != id),
        ])
    }

    constructor() {
        this.channel.listen<{type: string, data: number}>((message) => {
            if(message.type === NOTIFICATION_COUNT) {
                this.count.set(message.data); // for new-tab bootstr
            }
        })
    }

    ngOnDestory() {
        this.channel.close();
    }
}