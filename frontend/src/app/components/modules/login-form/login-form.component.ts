import {Component, OnInit} from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { USER_UD_KEY } from '../../../common/constants';

@Component({
  selector: 'app-login-form',
  imports: [],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {
  protected userId: string|undefined;

  constructor(private sessionStorageService: SessionStorageService) {}

  ngOnInit(): void {
    this.userId = this.sessionStorageService.retrieve(USER_UD_KEY);
  }
}
