import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, isActive, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  router = inject(Router);

  cardActive = isActive('/card', this.router);

  protected readonly title = signal('my-app');
}
