import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/shared/navigation/navigation.component';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private router: Router) {}

  protected isStartScreen() {
    return this.router.url === '/'
  }
}
