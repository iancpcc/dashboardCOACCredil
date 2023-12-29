import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheResolverService {
  private cache = new Map<string, [Date | null, HttpResponse<unknown>]>();
  constructor() {}

  set(key: string, value: HttpResponse<any>, timeToAlive?: number) {
    if (timeToAlive) {
      let expiresIn = new Date();
      expiresIn.setSeconds(expiresIn.getSeconds() + timeToAlive);
      this.cache.set(key, [expiresIn, value]);
    } else {
      this.cache.set(key, [null, value]);
    }
  }

  get(key: string) {
    let data = this.cache.get(key);

    if (!data) return null;

    let expiresIn = data[0];
    let httpResponse = data[1];
    let now = new Date();

    if (now.getTime() > expiresIn?.getTime()!) {
      this.cache.delete(key);
      return null;
    }
  return httpResponse;
  }
  clearCache() {
    this.cache.clear();
  }
}
