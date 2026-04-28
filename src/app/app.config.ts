import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, TitleStrategy, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { AppTitleStrategy } from '../../projects/lib-common/strategy/title.strategy';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { httpInterceptor } from '../../projects/lib-common/interceptor/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withFetch(),
      withInterceptors([httpInterceptor])
    ),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, 
      withComponentInputBinding(),
      withRouterConfig({onSameUrlNavigation: 'reload'}),
    ), 
    {provide: TitleStrategy, useClass: AppTitleStrategy},
  ]
};
