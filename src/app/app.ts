import { Component, inject, signal } from '@angular/core';
import { isActive, Router, RouterOutlet } from '@angular/router';
import { Toast } from '../../projects/domains/toast/toast';
import { NotificationData } from '../../projects/lib-view/notification/notification-data';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Toast ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  router = inject(Router);
  private nd = inject(NotificationData);

  cardActive = isActive('/card', this.router);

  protected readonly title = signal('my-app');

  protected showNotifiction() {
     this.nd.addNotification({
          id: new Date().getTime(),
          type: 'success',
          title: 'Hey There',
          description: 'May I help you',
     })
  }
}
