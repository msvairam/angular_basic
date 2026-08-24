import { EnvironmentProviders, makeEnvironmentProviders, Type } from '@angular/core';
import { LOGGER_FORMATTER, LoggerFormatter } from './logger-formatter';

export function provideCustomLogger(service: Type<LoggerFormatter>): EnvironmentProviders {
    return makeEnvironmentProviders([
        {
            provide: LOGGER_FORMATTER,
            useClass: service,
        }
    ]);
}