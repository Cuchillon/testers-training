import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiErrorHandlingService implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = `Request to API failed, status: ${error.status}, message: ${error.message}`;
        this.handleApiError(errorMessage);
        return throwError(() => error);
      })
    );
  }

  private handleApiError(apiError: string) {
    alert(apiError);
    this.router.navigate(['/'])
      .then(r => console.error(apiError));
  }
}
