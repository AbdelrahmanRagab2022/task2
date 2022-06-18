import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { product } from './_Models/Product';


@Injectable({
  providedIn: 'root'
})
export class HttpCacheService {
  private requests: any = localStorage.getItem('cache')||{};
  
  

  constructor() { }

  get(url: string): HttpResponse<product[]> | undefined {
   this.requests=localStorage.getItem('cache')||{};
    return this.requests[url];
  }

  put(url: string, response: HttpResponse<product[]>): void {
    this.requests[url] = response;
    console.log('done');
    localStorage.setItem('cache',JSON.stringify(response.body));
  }

  invalidateUrl(url: string): void {
    this.requests[url] = undefined;
  }

  invalidateCache(): void {
    this.requests = { };
  }

}