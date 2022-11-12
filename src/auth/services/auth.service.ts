import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, switchMap, tap} from "rxjs";
import {UserAuthData} from "../interfaces/user-auth-data";
import {User} from "../models/user";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    authUser: User;

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {}

    getAuthUser(): string {
        return localStorage.getItem('user');
    }

    getUser(): Observable<any> {
        return this.http.get('user');
    }

    getUserType(): number {
        const user = JSON.parse(localStorage.getItem('user'));
        return user.type;
    }

    register(data: UserAuthData): Observable<any> {
        return this.http.post(`register`, data).pipe(
            tap((res: any) => {
                this.setTokenInLocalStorage(res);
            }),
            switchMap(() => {
                return this.getUser();
            }),
            tap((res) => {
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
            tap((res) => {
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

    getFavourites(): Observable<any> {
        return this.http.get('favourites');
    }

    addToFavorites(productId: number): Observable<any> {
        return this.http.post(`favourites/${productId}`, {});
    }

    removeFromFavorites(productId: number): Observable<any> {
        return this.http.delete(`favourites/${productId}`);
    }

    private setUserInLocalStorage(user: User): void {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userType', String(user.type));
    }

    private setTokenInLocalStorage(res: any): void {
        const token = res.data.token;
        localStorage.setItem('token', token);
    }

    private removeTokenFromLocalStorage(): void {
        localStorage.removeItem('token');
    }

    private removeUserFromLocalStorage(): void {
        localStorage.removeItem('user');
        localStorage.removeItem('userType');
    }

    private navigateToHomePage(): void {
        this.router.navigate(['/dashboard/menu/1'])
    }

}
