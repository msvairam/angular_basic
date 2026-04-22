import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'capPipe',
    pure: true,
})
export class CapPipe implements PipeTransform {
    transform(value: string | undefined, ...args: any[]) {
        return value?.toUpperCase() ?? '';
    }
}