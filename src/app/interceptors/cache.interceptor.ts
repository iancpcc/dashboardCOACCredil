import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

import { CacheResolverService } from '../services/cache-resolver.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  TIME_TO_ALIVE: number | undefined = 3600; //el tiempo limite del cache que sea 1 hora

  constructor(private _cacheRsv: CacheResolverService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log(request)
    if(request.method !='GET'){

      return next.handle(request);
    }

    let cacheResponse = this._cacheRsv.get(request.url);

    if (cacheResponse) {
      return of(cacheResponse);
    }

    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this._cacheRsv.set(request.url, event, this.TIME_TO_ALIVE);
        }
      })
    );
  }
}
