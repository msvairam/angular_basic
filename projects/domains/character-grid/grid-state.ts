import { Injectable ,signal, inject, linkedSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { PageResult } from './character';
import { CharacterData } from './character-data';

import { tap, catchError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GridState {
    private cd = inject(CharacterData);

    public searchTerm = signal<string>('');
    public page = signal<number>(1);

    public isLoading = signal<boolean>(false);
    public totalPages = signal<number | null>(null);
    public reset = signal<boolean>(false);
    public isError = signal<boolean>(false);

    private characterResource = rxResource({
        params: () => {
            return {
                page: this.page(),
                searchTerm: this.searchTerm()
            };
        },
        stream: ({params: { page, searchTerm: name }}) => {
            return this.cd.fetchCharacter({page, name}).pipe(
                tap((result) => {
                    if (result) {
                        this.isLoading.set(false);
                        this.totalPages.set(result.info.pages);
                        this.isError.set(false);
                    }
                }),
                catchError((err) => {
                    this.isLoading.set(false);
                    this.isError.set(true);
                    throw new Error(err.message);
                })
            )
        }
    });

    public rows = linkedSignal<PageResult[], PageResult[]>({
          source: () => this.characterResource.value()?.results ?? [],
          computation: (newVal, previousVal) => {
                return previousVal ? [...newVal, ...(previousVal.value)] : [...newVal];
          } 
    });
}