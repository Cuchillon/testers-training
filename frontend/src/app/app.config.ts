import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideNgxWebstorage, withSessionStorage } from 'ngx-webstorage';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideLoadingBarInterceptor } from '@ngx-loading-bar/http-client';
import { ApiErrorHandlingService } from './services/api-error-handling.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNgxWebstorage(withSessionStorage()),
    provideHttpClient(withInterceptorsFromDi()),
    provideLoadingBarInterceptor(),
    provideAnimations(),
    provideToastr(),
    { provide: HTTP_INTERCEPTORS, useClass: ApiErrorHandlingService, multi: true },
  ]
};
