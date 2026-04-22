import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpEventType } from '@angular/common/http';
import { catchError, Observable } from "rxjs";
import { Card } from "../modal/card";

@Injectable()
export class CardList {
    private readonly http = inject(HttpClient);

    public getCards(): Observable<Array<Card>> {
        return this.http.get<Array<Card>>('https://jsonplaceholder.typicode.com/posts')
        .pipe(catchError(err => {
          throw err.error?.message;
        }));
    }

    public downloadPDF() {
        return this.http.get('/file', {
            observe: 'events',
            responseType: 'blob',
            reportProgress: true,
        }).subscribe((event) => {
            if (event.type === HttpEventType.DownloadProgress) {
                const percent = Math.round((event.loaded / (event.total || 1)) * 100)
                console.log('progress', percent);
            }

            if (event.type === HttpEventType.Response) {
                const blob = event.body!;
                this.saveFile(blob, 'file.zip');
            }
        });
    }

    saveFile(blob: Blob, fileName: string) {
        const url = window.URL.createObjectURL(blob);
      //  const a = document.
    }
}