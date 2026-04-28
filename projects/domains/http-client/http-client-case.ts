import { Component } from '@angular/core';
import { Post } from './usecase1/post';

@Component({
    imports: [Post],
    template: `<h1>Http Client</h1>
    <app-post />
    `,
})
export class HttpClientCase {
    
}