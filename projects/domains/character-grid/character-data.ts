import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { PageResponse } from './character';

@Injectable({
    providedIn: 'root',
})
export class CharacterData {
    private http = inject(HttpClient);

    public fetchCharacter(params: { page: number, name: string }): Observable<PageResponse> {
        return this.http.get<PageResponse>('https://rickandmortyapi.com/api/character/', {params});
    }
}