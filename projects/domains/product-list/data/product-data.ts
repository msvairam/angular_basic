import { Injectable, inject } from '@angular/core';
import { HttpClient } from'@angular/common/http';
import { Observable } from 'rxjs';

import { ProductResponse, ProductRequest } from '../model/product';

@Injectable()
export class ProductData {

    private readonly http = inject(HttpClient);
    public getProducts(request: ProductRequest): Observable<ProductResponse> {
        return this.http.get<ProductResponse>('https://dummyjson.com/products/search', { params: {...request} });
    }
}