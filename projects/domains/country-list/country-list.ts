import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { MultipleSelector, Option} from './multiple-selector';

const COUNTRY_LIST: Option[] = [
    {
        id: 1,
        label: 'India',
        select: false,
    },
    {
        id: 2,
        label: 'USA',
        select: false,
    }
]

@Component({
    selector: 'app-country-list',
    imports: [MultipleSelector],
    template: `
        <app-multiple-selectors [options]="countryList()"/>
    `,
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryList {
    protected countryList = signal(COUNTRY_LIST);
}