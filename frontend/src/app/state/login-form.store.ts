import { LoginFormData } from '../model/login-form-data';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { LoginFormApiService } from '../services/login-form-api.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { TestCaseRequest } from '../model/test-case-request';

type LoginFormState = {
  data: LoginFormData;
  isLoading: boolean;
};

const initialState: LoginFormState = {
  data: {
    username: '',
    password: '',
    testCasesAllCount: 0,
    testCasesCheckedCount: 0
  },
  isLoading: true,
};

export const LoginFormStore = signalStore(
  withState<LoginFormState>(initialState),
  withMethods((store, loginFormApiService = inject(LoginFormApiService)) => ({
    loadInitData: rxMethod<string>(
      pipe(
        switchMap(userId => {
          return loginFormApiService.initLoginFormTraining({ userId }).pipe(
            tapResponse({
              next: response => patchState(store, {
                data: {
                  username: response.username,
                  password: response.password,
                  testCasesAllCount: response.testCasesAllCount,
                  testCasesCheckedCount: response.testCasesCheckedCount
                }
              }),
              error: console.error,
              finalize: () => patchState(store, { isLoading: false })
            })
          );
        })
      )
    ),
    loadTestCaseData: rxMethod<TestCaseRequest>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(request => {
          return loginFormApiService.checkTestCaseMatching(request).pipe(
            tapResponse({
              next: response => patchState(store, (state) => ({
                data: {
                  ...state.data,
                  testCasesCheckedCount: response.testCasesCheckedCount,
                  testCaseType: response.testCaseType,
                  errorMessage: response.errorMessage
                }
              })),
              error: console.error,
              finalize: () => patchState(store, { isLoading: false })
            })
          );
        })
      )
    )
  }))
);
