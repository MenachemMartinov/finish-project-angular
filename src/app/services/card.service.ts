import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import url from '../commen/config';
import { Card } from '../interface/card';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  // default url request
  apiUrl = url.apiUrl;
  // this is default headers
  headers = new HttpHeaders()
    .set('auth-token', localStorage.getItem('token'))
    .set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  // observable to get all card
  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.apiUrl}/cards/all-cards`);
  }

  // observable to get one card
  getCard(id): Observable<Card> {
    return this.http.get<Card>(`${this.apiUrl}/cards/${id}`);
  }

  // observable to create a new card
  newCard(valid, data): Observable<Card> {
    if (valid) {
      return this.http.post<Card>(
        `${this.apiUrl}/cards/new-card`,
        JSON.stringify(data),
        {
          headers: this.headers,
        }
      );
    }
  }

  // observable to update card
  updateCard(id, valid, data): Observable<Card> {
    if (valid) {
      return this.http.put<Card>(
        `${this.apiUrl}/cards/${id}`,
        JSON.stringify(data),
        {
          headers: this.headers,
        }
      );
    }
  }

  // observable to update card img
  updateCardImg(id, data): Observable<Card> {
    return this.http.put<Card>(
      `${this.apiUrl}/cards/${id}/upload-img`,
      JSON.stringify(data),
      {
        headers: this.headers,
      }
    );
  }

  // observable delete card
  deleteCard(id): Observable<Card> {
    return this.http.delete<Card>(`${this.apiUrl}/cards/${id}`, {
      headers: this.headers,
    });
  }
}
