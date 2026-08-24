import { Injectable } from '@angular/core';
import { LoggerFormatter } from './logger-formatter';

@Injectable()
export class LoggerService implements LoggerFormatter {
    format(message: string): void {
        console.log(message);
    }
}