import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/shared/navigation/navigation.component';
import { SessionStorageService } from 'ngx-webstorage';
import { USER_ID_KEY } from './common/constants';
import { NgxLoadingBar } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent, NgxLoadingBar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  constructor(private sessionStorageService: SessionStorageService) {}

  ngOnInit(): void {
    if (!this.sessionStorageService.retrieve(USER_ID_KEY)) {
      this.sessionStorageService.store(USER_ID_KEY, crypto.randomUUID());
    }
  }
}
