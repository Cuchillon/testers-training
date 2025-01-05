import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/shared/navigation/navigation.component';
import { SessionStorageService } from 'ngx-webstorage';
import { USER_UD_KEY } from './common/constants';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  constructor(private sessionStorageService: SessionStorageService) {}

  ngOnInit(): void {
    if (!this.sessionStorageService.retrieve(USER_UD_KEY)) {
      this.sessionStorageService.store(USER_UD_KEY, crypto.randomUUID());
    }
  }
}
