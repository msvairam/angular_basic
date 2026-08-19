import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
export const ProductHttpInterceptors: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const headers  = req.headers.set('product_id', '23');
    req = req.clone({
        headers
    })

    return next(req);
}