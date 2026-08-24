import { InjectionToken } from '@angular/core';

export abstract class LoggerFormatter {
    abstract format(message: string): void;
}

export const LOGGER_FORMATTER = new InjectionToken<LoggerFormatter>('LoggerFormatter');