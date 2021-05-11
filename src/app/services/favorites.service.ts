import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import url from '../commen/config';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  // default url request
  apiUrl = url.apiUrl;
  // this is default headers
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('auth-token', localStorage.getItem('token'));
  constructor(private http: HttpClient) {}

  getFavorites() {
    return this.http.get<string[]>(`${this.apiUrl}/favorites/all-favorites`, {
      headers: this.headers,
    });
  }

  getOneFavorites(cardId) {
    return this.http.get<{massage}>(`${this.apiUrl}/favorites/${cardId}`, {
      headers: this.headers,
    });
  }
  newFavorites(cardId) {
    return this.http.get<{massage}>(`${this.apiUrl}/favorites/${cardId}/new-favorites`, {
      headers: this.headers,
    });
  }

  deleteFavorites(cardId) {
    return this.http.delete<{massage}>(`${this.apiUrl}/favorites/${cardId}`, {
      headers: this.headers,
    });
  }
}
