
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Post } from './post.modal';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PostData {
    readonly http = inject(HttpClient);

    sendPost(data: Omit<Post, 'id'>) {
        return this.http.post<Post>('https://jsonplaceholder.typicode.com/posts', data);
    }

    getPostByParams(params: { id: number}): Observable<Array<Post>> {
        return this.http.get<Array<Post>>('https://jsonplaceholder.typicode.com/pots', { params, withCredentials: true, })
    }
}