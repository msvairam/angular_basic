import { Injectable, inject } from '@angular/core';
import { HttpClient } from'@angular/common/http';
import { Observable } from 'rxjs';

import { ProductResponse } from '../model/product';

@Injectable()
export class ProductData {

    private readonly http = inject(HttpClient);
    public getProducts(params: {limit: number, skip: number, q: string}): Observable<ProductResponse> {
        return this.http.get<ProductResponse>('https://dummyjson.com/products/search', {params});
    }
}