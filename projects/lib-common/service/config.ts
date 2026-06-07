import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ConfigService {
    protected apiBaseUrl!: string;

    loadConfig() {
        const http = inject(HttpClient);
        return firstValueFrom(
            http.get<{ apiBaseUrl: string }>('/assets/config.json')
        ).then((configData) => {
            this.setBaseUrl(configData.apiBaseUrl);
        })
    }

    setBaseUrl(url: string) {
        this.apiBaseUrl = url;
        console.log(this.apiBaseUrl);
    }
}