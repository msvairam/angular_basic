import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
export class legacyInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<unknown>, next:HttpHandler) {
        const request = req.clone({
            setHeaders: {
                'legacy': 'true',
            }
        })
        return next.handle(request);
    }
}