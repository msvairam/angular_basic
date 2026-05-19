import { ApplicationConfig, ErrorHandler, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, TitleStrategy, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { AppTitleStrategy } from '../../projects/lib-common/strategy/title.strategy';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { AuthInterceptor } from '../../projects/lib-common/interceptor/auth.interceptor';
import { ErrorInterceptor } from '../../projects/lib-common/interceptor/error.incerceptor';
import { GlobalErrorHandler } from '../../projects/lib-common/service/global-error-handler';

const loadConfig = () => {
  return () => console.log('Before Loading');
} 

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    provideAppInitializer(() => {
      return console.log('app Initializer');
    }),
    provideHttpClient(
      withFetch(),
      withInterceptors([AuthInterceptor, ErrorInterceptor])
    ),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, 
      withComponentInputBinding(),
      withRouterConfig({onSameUrlNavigation: 'reload'}),
    ), 
    {provide: TitleStrategy, useClass: AppTitleStrategy},
  ]
};
