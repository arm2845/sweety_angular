import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {UserAuthData} from "../interfaces/user-auth-data";
import {User} from "../models/user";
import {Router} from "@angular/router";


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    authUser: User | any;

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {}

    getUser(): Observable<any> {
        return this.http.get('user');
    }

    getCart(): Observable<any> {
        return this.http.get('cart');
    }

    getFavourites(): Observable<any> {
        return this.http.get('favourites');
    }

    register(data: UserAuthData): Observable<any> {
        return this.http.post(`register`, data).pipe(
            tap((res: any) => {
                this.setTokenInLocalStorage(res);
                this.navigateToHomePage();
            }),
        );
    }

    login(data: UserAuthData): Observable<any> {
        return this.http.post(`login`, data).pipe(
            tap((res: any) => {
                this.setTokenInLocalStorage(res);
                this.navigateToHomePage();
            }),
        );
    }

    logout(): Observable<any> {
        return this.http.delete(`logout`).pipe(
            tap(() => {
                this.removeTokenFromLocalStorage();
                this.navigateToHomePage();
            }),
        )
    }

    addToFavorites(productId: number): Observable<any> {
        return this.http.post(`favourites/${productId}`, {});
    }

    removeFromFavorites(productId: number): Observable<any> {
        return this.http.delete(`favourites/${productId}`);
    }

    addToCart(productId: number): Observable<any> {
        return this.http.post(`cart/${productId}`, {});
    }

    removeFromCart(productId: number): Observable<any> {
        return this.http.delete(`cart/${productId}`);
    }

    private setTokenInLocalStorage(res: any): void {
        const token = res.data.token;
        localStorage.setItem('token', token);
    }

    private removeTokenFromLocalStorage(): void {
        localStorage.removeItem('token');
    }

    private navigateToHomePage(): void {
        this.router.navigate(['/dashboard/menu/1'])
            .then(() => {
                window.location.reload();
            },
        )
    }

}
