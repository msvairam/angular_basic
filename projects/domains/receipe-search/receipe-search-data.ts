import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ReceipeResponse } from './receipe-search.model';


@Injectable({
    providedIn: 'root',
})
export class ReceipeSearchData {

    private readonly http = inject(HttpClient);

    getReceipe(searchTerm: string): Observable<ReceipeResponse> {
       return this.http.get<ReceipeResponse>('https://dummyjson.com/recipes/search?q='+searchTerm);
    }
}