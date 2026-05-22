import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class UserData {
    private readonly http = inject(HttpClient);

    public getUser(user: string): Observable<boolean> {
        const value = (user == 'msvairam')? true: false;
        return of(value);
    }
}