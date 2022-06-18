import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from './_Models/Product';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  category:BehaviorSubject<string>=new BehaviorSubject('all');
  baseUrl:string ='https://captello.firebaseio.com/products.json';

  constructor(private _HttpClient : HttpClient) { }
  getProduct() {
    return this._HttpClient.get<product[]>(this.baseUrl);
  }
  getProductById(id:number) {
    return this._HttpClient.get<product>(`https://captello.firebaseio.com/products/${id}.json`);
  }
}
