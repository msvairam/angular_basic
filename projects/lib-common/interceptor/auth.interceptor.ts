import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    console.log('Auth Incerptor');
    const token = localStorage.getItem('token');

    if (token) {
       const cloneReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
            headers: req.headers.append('X-Authentication-Token', token)
        });
        return next(cloneReq);
    }

    return next(req);
}