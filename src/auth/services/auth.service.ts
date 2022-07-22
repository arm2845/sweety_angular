import { Injectable } from '@angular/core';
import { User } from "../models/user";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserAuthData } from "../interfaces/user-auth-data";
import { Product } from "../../app/models/product";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private authUser: User;

  constructor(
    private http: HttpClient,
  ) {
  }

  register(data: UserAuthData):Observable<any> {
    return this.http.post(`register`, data);
  }

  login(data: UserAuthData): Observable<any> {
    return this.http.post(`login`, data);
  }

  logout(): Observable<any> {
    return this.http.delete(`logout`);
  }

  addToFavorites(productId: string): Observable<any> {
    return this.http.post(`favourites/${productId}`, {});
  }

  deleteFromFavorites(productId: string): Observable<any> {
    return this.http.delete(`favourites/${productId}`);
  }

}
