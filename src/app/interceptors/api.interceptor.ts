import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const baseUrl = 'https://resto.3spiders.com/api/';
        const apiReq = request.clone({url: `${baseUrl}${request.url}`});
        return next.handle(apiReq);
    }
}
