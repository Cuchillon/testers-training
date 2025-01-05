import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserIdInitRequest } from '../model/user-id-init-request';
import { Observable, of } from 'rxjs';
import { LoginFormInitResponse } from '../model/init-response';
import { TestCaseRequest } from '../model/test-case-request';
import { LoginFormTestCaseResponse } from '../model/test-case-response';
import { BASE_URL, PATHS } from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class LoginFormApiService {

  constructor(private http: HttpClient) {}

  initLoginFormTraining(request: UserIdInitRequest): Observable<LoginFormInitResponse> {
    return this.http.post<LoginFormInitResponse>(`${BASE_URL}${PATHS.LOGIN_FORM}`, request);
  }

  checkTestCaseMatching(request: TestCaseRequest): Observable<LoginFormTestCaseResponse> {
    return this.http.post<LoginFormTestCaseResponse>(`${BASE_URL}${PATHS.LOGIN_FORM_CASE}`, request);
  }
}
