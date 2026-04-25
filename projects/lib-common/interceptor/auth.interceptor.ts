import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {

    const token = localStorage.getItem('token');

    if (token) {
       const cloneReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            }
        });
        return next(cloneReq).pipe(
            catchError((error) => {
                if (error.status === 500) {
                    console.log('500 Error');
                }

                if (error.status === 404) {
                    console.log('404 Error');
                }
                return throwError(() => error);
            })
        );
    }

    return next(req);
}