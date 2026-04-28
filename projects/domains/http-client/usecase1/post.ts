import { Component, computed, effect, inject, resource, signal } from '@angular/core';
import { PostData } from '../post.data'
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, of, throwError } from 'rxjs';

@Component({
    selector: 'app-post',
    template: `<h1>Post</h1>
    <button (click)="sendPost()">Send Post</button>
    @if(postResource.hasValue()) {
        @for(val of post(); track val.id) {
            <p>{{val.id}}</p>
        }
    }
    @else if (postResource.error()) {
        <i>Loading Error:  {{ postResource.error()?.message }}</i>
    }
    <p>Reload<p>
        <button (click)="postResource.reload()">Reload</button>
    `,
})
export class Post {
    readonly postData = inject(PostData);
    readonly userid = signal(1);

    readonly postResource = rxResource({
        params: () => ({ id: this.userid() }),
        stream: ({params: {id}}) => {
              return this.postData.getPostByParams({ id }).pipe(
                catchError((err) => {
                    console.log(err);
                    throw new Error('Server Down');
                })
              );
        },
        defaultValue: [],
    })

    readonly post = computed(() => {
        return this.postResource.value()
    });

    sendPost() {
        this.postData.sendPost({
            title: 'foo',
            body: 'bar',
            userId: 1,
        }).subscribe((data) => {
            console.log(data);
        })
    }
}