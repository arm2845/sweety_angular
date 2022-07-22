import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable, tap} from "rxjs";
import { UserAuthData } from "../interfaces/user-auth-data";
import {User} from "../models/user";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUser: User | undefined;

  constructor(
    private http: HttpClient,
  ) {
    console.log('service constructor')
    this.getUser().pipe(
      tap((res) => this.authUser = res.data),
    )
      .subscribe();
  }

  getUser(): Observable<any> {
    return this.http.get('user');
  }

  register(data: UserAuthData): Observable<any> {
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

  removeFromFavorites(productId: string): Observable<any> {
    return this.http.delete(`favourites/${productId}`);
  }

}
