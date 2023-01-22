import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable()
export class MainService {

    constructor(
        private http: HttpClient,
    ) {
    }

    getCategories(): Observable<any> {
        return this.http.get(`categories`);
    }

    getExcelFile(data: {start_date: string, end_date: string}): Observable<any> {
        return this.http.get(`orders-excel?start_date=${data.start_date}&end_date=${data.end_date}`,{responseType: 'blob'});
    }

}
