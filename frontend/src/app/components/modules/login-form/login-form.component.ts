import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
  WritableSignal
} from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { USER_UD_KEY } from '../../../common/constants';
import { LoginFormApiService } from '../../../services/login-form-api.service';
import { LoginFormInitResponse } from '../../../model/init-response';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginFormTestCaseData } from '../../../model/test-case-data';

@Component({
  selector: 'app-login-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  private destroyRef = inject(DestroyRef);
  protected userId: string = '';
  protected initData: WritableSignal<LoginFormInitResponse|undefined> = signal(undefined);
  protected username = computed(() => this.initData()?.username ?? '');
  protected password = computed(() => this.initData()?.password ?? '');
  protected testCasesAllCount = computed(() => this.initData()?.testCasesAllCount ?? 0);
  protected testCasesCheckedCount: WritableSignal<number> = signal(0);

  protected readonly loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private sessionStorageService: SessionStorageService,
    private loginFormApiService: LoginFormApiService,
  ) {
    this.userId = this.sessionStorageService.retrieve(USER_UD_KEY);
    this.loginFormApiService.initLoginFormTraining({ userId: this.userId })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response) => {
        this.initData.set(response);
        this.testCasesCheckedCount.set(response.testCasesCheckedCount);
      });
  }

  protected onSubmit() {
    const enteredLogin = this.loginForm.controls['username'].value ?? '';
    const enteredPassword = this.loginForm.controls['password'].value ?? '';
    const data: LoginFormTestCaseData = { username: enteredLogin, password: enteredPassword };
    this.loginFormApiService.checkTestCaseMatching({ userId: this.userId, testCaseData: data })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response) =>
        this.testCasesCheckedCount.set(response.testCasesCheckedCount)
      );
    this.loginForm.reset();
  }
}
