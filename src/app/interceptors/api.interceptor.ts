import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    translation_url = 'assets/i18n';

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const baseUrl = 'https://resto.3spiders.com/api/';
        const modifiedUrl = request.url.includes(this.translation_url) ? request.url : `${baseUrl}${request.url}`;
        const apiReq = request.clone({url: modifiedUrl});
        return next.handle(apiReq);
    }
}
