import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductAdditionalData} from "../interfaces/product-additional-data";

@Injectable({
    providedIn: 'root'
})
export class CartService {

    constructor(
        private http: HttpClient,
    ) {
    }

    getCart(): Observable<any> {
        return this.http.get('cart');
    }

    getCartCount(): number {
        return Number(localStorage.getItem('cartCount'));
    }

    addToCart(productId: number, data: ProductAdditionalData): Observable<any> {
        return this.http.post(`cart/${productId}`, data);
    }

    removeFromCart(id: number): Observable<any> {
        return this.http.delete(`cart/${id}`);
    }

    updateCartItem(id: number, data: ProductAdditionalData): Observable<any> {
        return this.http.patch(`cart/${id}`, data);
    }

}
