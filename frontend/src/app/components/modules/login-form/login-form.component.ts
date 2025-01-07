import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  signal,
  WritableSignal
} from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { SUCCESS_LOGIN_MESSAGE, USER_UD_KEY } from '../../../common/constants';
import { LoginFormApiService } from '../../../services/login-form-api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginFormTestCaseData } from '../../../model/test-case-data';
import { ToastrService } from 'ngx-toastr';
import { LoginFormState } from '../../../model/login-form-state';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, LoadingComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  private destroyRef = inject(DestroyRef);
  private userId: string = '';

  private state: WritableSignal<LoginFormState> = signal({
    username: '',
    password: '',
    testCasesAllCount: 0,
    testCasesCheckedCount: 0
  });

  protected isLoading = signal(true);

  protected username = computed(() => this.state().username);
  protected password = computed(() => this.state().password);
  protected testCasesAllCount = computed(() => this.state().testCasesAllCount);
  protected testCasesCheckedCount = computed(() => this.state().testCasesCheckedCount);

  protected readonly loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private sessionStorageService: SessionStorageService,
    private loginFormApiService: LoginFormApiService,
    private toastrService: ToastrService,
  ) {
    this.userId = this.sessionStorageService.retrieve(USER_UD_KEY);
    this.loginFormApiService.initLoginFormTraining({ userId: this.userId })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response) => {
        this.state.set({
          username: response.username,
          password: response.password,
          testCasesAllCount: response.testCasesAllCount,
          testCasesCheckedCount: response.testCasesCheckedCount
        });
        this.isLoading.set(false);
      });
    effect(() => {
      const currentCase = this.state().testCaseType;
      if (currentCase === 'NEGATIVE') {
        this.showError(this.state().errorMessage ?? 'Error message empty');
      } else if (currentCase === 'POSITIVE') {
        this.showSuccess();
      }
    });
  }

  protected onSubmit() {
    this.isLoading.set(true);
    const enteredLogin = this.loginForm.controls['username'].value ?? '';
    const enteredPassword = this.loginForm.controls['password'].value ?? '';
    const data: LoginFormTestCaseData = { username: enteredLogin, password: enteredPassword };
    this.loginFormApiService.checkTestCaseMatching({ userId: this.userId, testCaseData: data })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response) => {
        this.state.update(state => ({
          ...state,
          testCasesCheckedCount: response.testCasesCheckedCount,
          testCaseType: response.testCaseType,
          errorMessage: response.errorMessage,
        }));
        this.isLoading.set(false);
      });
    this.loginForm.reset();
  }

  private showError(errorMessage: string) {
    this.toastrService.error(errorMessage, 'Invalid data');
  }

  private showSuccess() {
    this.toastrService.success(SUCCESS_LOGIN_MESSAGE, 'Success');
  }
}
