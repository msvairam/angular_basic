import { ApplicationConfig, ErrorHandler, provideAppInitializer, provideBrowserGlobalErrorListeners, inject } from '@angular/core';
import { provideRouter, TitleStrategy, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { AppTitleStrategy } from '../../projects/lib-common/strategy/title.strategy';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, ɵHTTP_ROOT_INTERCEPTOR_FNS } from '@angular/common/http';

import { AuthInterceptor } from '../../projects/lib-common/interceptor/auth.interceptor';
import { ErrorInterceptor } from '../../projects/lib-common/interceptor/error.interceptor';
import { GlobalErrorHandler } from '../../projects/lib-common/service/global-error-handler';
import { ConfigService } from '../../projects/lib-common/service/config';
import { LoggerService } from '../../projects/lib-common/utils-logger/logger.service';
import { provideCustomLogger } from '../../projects/lib-common/utils-logger/provider';

export const appConfig: ApplicationConfig = {
  providers: [
      provideHttpClient(
      withFetch(),      
    ),
    {
        provide: ɵHTTP_ROOT_INTERCEPTOR_FNS,
        useValue: [AuthInterceptor, ErrorInterceptor],
      },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    provideCustomLogger(LoggerService),
    provideAppInitializer(() => {
      return inject(ConfigService).loadConfig();
    }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, 
      withComponentInputBinding(),
      withRouterConfig({onSameUrlNavigation: 'reload'}),
    ), 
    {provide: TitleStrategy, useClass: AppTitleStrategy},

  ]
};
