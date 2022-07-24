import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {UserAuthData} from "../interfaces/user-auth-data";
import {User} from "../models/user";
import {Router} from "@angular/router";
import {stringifyObj} from "../../app/helpers/json.helper";


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    authUser: User | undefined;

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {
        this.getUser().subscribe();
    }

    getUser(): Observable<any> {
        return this.http.get('user').pipe(
            tap((res: any) => {
                this.authUser = res.data;
                localStorage.setItem('user', stringifyObj(res.data));
            })
        )
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
            tap((res: any) => {
                this.removeTokenFromLocalStorage(res);
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

    private removeTokenFromLocalStorage(res: any) {
        const token = res.data.token;
        localStorage.setItem('token', token);
    }

    private navigateToHomePage() {
        this.router.navigate(['/dashboard/menu/1']);
    }

}
