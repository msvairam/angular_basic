import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

export const ErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    console.log('Error Handler');
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            switch(error.status) {
                case 401:
                    // unauthorized 
                break;
                case 403:
                    // Access Denied
                break;
                case 404:
                    // not found
                break;
                case 500:
                    // Server error
                break;
                default:
                    // unexpected Error
            }
            return throwError(() => error);
        })
    );
}