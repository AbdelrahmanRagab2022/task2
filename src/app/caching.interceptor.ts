import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpCacheService } from './cache.service';
import { product } from './_Models/Product';
import { ConditionalExpr } from '@angular/compiler';
import { ProductsService } from './products.service';




@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor(
  private cacheService: HttpCacheService,
  private _productService:ProductsService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    

    //check if the outgoing calls are GET and MRDH APIs
    if (req.method === 'GET' && req.url==this._productService.baseUrl ) { 
      // attempt to retrieve a cached response
      console.log(req.withCredentials);
      const cachedResponse:
        | HttpResponse<product[]>
        | undefined =  this.cacheService.get(req.url);

      // return cached response
      if (cachedResponse) { 
        console.log(`Returning a cached response: ${cachedResponse.url}`);
        console.log(cachedResponse);
        return of(cachedResponse);
      }

      // send request to server and add response to cache
      return next.handle(req).pipe(
        tap((event) => {
          if (event instanceof HttpResponse) {
            console.log(`Adding item to cache: ${req.url}`);
            this.cacheService.put(req.url, event);
          }
        })
      );
    }
    else {
        // pass along non-cacheable requests 
        return next.handle(req);
    }
  }
}