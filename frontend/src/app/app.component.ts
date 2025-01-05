import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/shared/navigation/navigation.component';
import { SessionStorageService } from 'ngx-webstorage';
import { USER_UD_KEY } from './common/constants';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private sessionStorageService: SessionStorageService) {}

  ngOnInit(): void {
    if (!this.sessionStorageService.retrieve(USER_UD_KEY)) {
      this.sessionStorageService.store(USER_UD_KEY, crypto.randomUUID());
    }
  }

  protected isStartScreen() {
    return this.router.url === '/'
  }
}
