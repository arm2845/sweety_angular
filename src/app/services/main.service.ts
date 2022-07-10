import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable()
export class MainService {

  baseUrl = 'http://resto.3spiders.com/api/';

  constructor(
    private http: HttpClient,
  ) {
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}categories`);
  }

}
