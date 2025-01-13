import { LoginFormData } from '../model/login-form-data';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { LoginFormApiService } from '../services/login-form-api.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { SessionStorageService } from 'ngx-webstorage';
import { USER_ID_KEY } from '../common/constants';
import { LoginFormTestCaseData } from '../model/test-case-data';

type LoginFormState = {
  _userId: string;
  data: LoginFormData;
  isLoading: boolean;
};

const initialState: LoginFormState = {
  _userId: '',
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
    loadTestCaseData: rxMethod<LoginFormTestCaseData>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(requestData => {
          return loginFormApiService.checkTestCaseMatching({
            userId: store._userId(),
            testCaseData: requestData
          }).pipe(
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
  })),
  withHooks((store, sessionStorageService = inject(SessionStorageService)) => ({
    onInit: () => {
      const userId = sessionStorageService.retrieve(USER_ID_KEY);
      patchState(store, { _userId: userId });
      store.loadInitData(store._userId);
    }
  }))
);
