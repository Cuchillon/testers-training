import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { SUCCESS_LOGIN_MESSAGE } from '../../../common/constants';
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
export class LoginFormComponent {
  protected readonly store = inject(LoginFormStore);

  protected readonly loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private toastrService: ToastrService) {
    effect(() => {
      const currentCase = this.store.data().testCaseType;
      if (currentCase === 'NEGATIVE') {
        this.showError(this.store.data().errorMessage ?? 'Error message empty');
      } else if (currentCase === 'POSITIVE') {
        this.showSuccess();
      }
    });
  }

  protected onSubmit() {
    const enteredLogin = this.loginForm.controls['username'].value ?? '';
    const enteredPassword = this.loginForm.controls['password'].value ?? '';
    const data: LoginFormTestCaseData = { username: enteredLogin, password: enteredPassword };
    this.store.loadTestCaseData(data);
    this.loginForm.reset();
  }

  private showError(errorMessage: string) {
    this.toastrService.error(errorMessage, 'Invalid data');
  }

  private showSuccess() {
    this.toastrService.success(SUCCESS_LOGIN_MESSAGE, 'Success');
  }
}
