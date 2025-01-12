import { ChangeDetectionStrategy, Component, effect, inject, OnInit } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { SUCCESS_LOGIN_MESSAGE, USER_UD_KEY } from '../../../common/constants';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginFormTestCaseData } from '../../../model/test-case-data';
import { ToastrService } from 'ngx-toastr';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { LoginFormStore } from '../../../state/login-form.store';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, LoadingComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  providers: [LoginFormStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit {
  private readonly userId: string;
  protected readonly store = inject(LoginFormStore);

  protected readonly loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private sessionStorageService: SessionStorageService,
    private toastrService: ToastrService,
  ) {
    this.userId = this.sessionStorageService.retrieve(USER_UD_KEY);

    effect(() => {
      const currentCase = this.store.data().testCaseType;
      if (currentCase === 'NEGATIVE') {
        this.showError(this.store.data().errorMessage ?? 'Error message empty');
      } else if (currentCase === 'POSITIVE') {
        this.showSuccess();
      }
    });
  }

  ngOnInit(): void {
    this.store.loadInitData(this.userId);
  }

  protected onSubmit() {
    const enteredLogin = this.loginForm.controls['username'].value ?? '';
    const enteredPassword = this.loginForm.controls['password'].value ?? '';
    const data: LoginFormTestCaseData = { username: enteredLogin, password: enteredPassword };
    this.store.loadTestCaseData({ userId: this.userId, testCaseData: data });
    this.loginForm.reset();
  }

  private showError(errorMessage: string) {
    this.toastrService.error(errorMessage, 'Invalid data');
  }

  private showSuccess() {
    this.toastrService.success(SUCCESS_LOGIN_MESSAGE, 'Success');
  }
}
