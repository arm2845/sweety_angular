import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, switchMap, tap} from "rxjs";
import {UserAuthData} from "../interfaces/user-auth-data";
import {User} from "../models/user";
import {Router} from "@angular/router";
import {parseObj, stringifyObj} from "../../app/helpers/json.helper";


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {}

    get authUser(): User {
        return parseObj(localStorage.getItem('user'));
    }

    getUser(): Observable<any> {
        return this.http.get('user');
    }

    register(data: UserAuthData): Observable<any> {
        return this.http.post(`register`, data).pipe(
            tap((res: any) => {
                this.setTokenInLocalStorage(res);
            }),
            switchMap(() => {
                return this.getUser();
            }),
            tap((res: any) => {
                this.setUserInLocalStorage(res.data);
                this.navigateToHomePage();
            }),
        );
    }

    login(data: UserAuthData): Observable<any> {
        return this.http.post(`login`, data).pipe(
            tap((res: any) => {
                this.setTokenInLocalStorage(res);
            }),
            switchMap(() => {
                return this.getUser();
            }),
            tap((res: any) => {
                this.setUserInLocalStorage(res.data);
                this.navigateToHomePage();
            }),
        );
    }

    logout(): Observable<any> {
        return this.http.delete(`logout`).pipe(
            tap(() => {
                this.removeTokenFromLocalStorage();
                this.removeUserFromLocalStorage();
                this.navigateToHomePage();
            }),
        )
    }

    addToFavorites(productId: string): Observable<any> {
        return this.http.post(`favourites/${productId}`, {});
    }

    removeFromFavorites(productId: string): Observable<any> {
        return this.http.delete(`favourites/${productId}`);
    }

    addToCart(productId: string): Observable<any> {
        return this.http.post(`cart/${productId}`, {});
    }

    removeFromCart(productId: number | undefined): Observable<any> {
        return this.http.delete(`cart/${productId}`);
    }

    private setTokenInLocalStorage(res: any) {
        const token = res.data.token;
        localStorage.setItem('token', token);
    }

    private removeTokenFromLocalStorage() {
        localStorage.removeItem('token');
    }

    private navigateToHomePage() {
        this.router.navigate(['/dashboard/menu/1'])
            .then(() => {
                window.location.reload();
            },
        )
    }

    private removeUserFromLocalStorage(): void {
        localStorage.removeItem('user');
    }

    private setUserInLocalStorage(data: any): void {
        localStorage.setItem('user', stringifyObj(data));
    }

}
