import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class IngredientsService {

    constructor(
        private http: HttpClient,
    ) {
    }

    getIngredients(): Observable<any> {
      return this.http.get('ingredients');
    }

    changeAvailability(id: number, data: {in_stock: boolean}): Observable<any> {
        return this.http.patch(`ingredients-availability/${id}`, data);
    }

}
