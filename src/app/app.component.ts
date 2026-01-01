import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav>
      <a routerLink="/">Home</a>
      <a routerLink="/cart">Cart</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    nav { background: #333; padding: 1rem; }
    nav a { color: white; text-decoration: none; margin-right: 20px; padding: 10px; }
    nav a:hover { background: #555; }
  `]
})
export class AppComponent {
  title = 'travel-itinerary-app';
}
