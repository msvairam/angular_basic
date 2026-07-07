import { Component, ChangeDetectionStrategy, signal, inject, computed } from '@angular/core';
import { rxResource, toSignal, toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, shareReplay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { SearchBox } from '../../lib-view/search-box/search-box';
import { ReceipeSearchData } from './receipe-search-data';
import { ReceipeResponse } from './receipe-search.model';

@Component({
    selector: 'app-receipe-search',
    imports: [ SearchBox ],
    providers: [],
    template: `<app-search-box [searchList]="receipeList()" [searchLabel]="searchLabel" (inputChange)="changeSearch($event)"/>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReceipeSearch {

    private receipeData = inject(ReceipeSearchData);

    protected searchLabel = 'AutoComplete Receipe Search';
    protected searchTerm = signal('');
    private cachedReceipe = new Map<string, Observable<ReceipeResponse>>();

   private debounceSearchTerm = toSignal(
        toObservable(this.searchTerm).pipe(
            debounceTime(300),
            distinctUntilChanged(),
            takeUntilDestroyed(),
        ),{
            initialValue: '',
        }
   )
    
    changeSearch(val: string) {
       this.searchTerm.set(val);
    }

    private readonly receipeResource = rxResource({
        params: () => {
            const searchTerm = this.debounceSearchTerm();
            return { searchTerm };
        },
        stream: ({params: { searchTerm }}) => {
            if(!this.cachedReceipe.get(searchTerm)) {
                const request$ = this.receipeData.getReceipe(searchTerm).pipe(
                    shareReplay({bufferSize: 1, refCount : true })
                );
                this.cachedReceipe.set(searchTerm, request$);
            }
            return this.cachedReceipe.get(searchTerm) ?? of({recipes: []});
        }
    },
);

    protected receipeList = computed(() => this.receipeResource.value()?.recipes ?? []);

}