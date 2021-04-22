import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import url from '../commen/config';
import { Category } from '../interface/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  // default url request
  apiUrl = url.apiUrl;
  // this is default headers
  headers = new HttpHeaders()
    .set('auth-token', window.localStorage.getItem('token'))
    .set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  // observable to get all categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }
  // observable to get one category
  getCategory(id): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/categories/${id}`);
  }

  // observable to create a new category
  newCategory(valid, data): Observable<Category> {
    if (valid) {
      return this.http.post<Category>(
        `${this.apiUrl}/categories/new-category`,
        JSON.stringify(data),
        {
          headers: this.headers,
        }
      );
    }
  }

  // observable to update category
  updateCategory(id, valid, data): Observable<Category> {
    if (valid) {
      return this.http.put<Category>(
        `${this.apiUrl}/categories/${id}`,
        JSON.stringify(data),
        {
          headers: this.headers,
        }
      );
    }
  }

  // observable to delete category
  deleteCategory(id): Observable<Category> {
    return this.http.delete<Category>(`${this.apiUrl}/categories/${id}`, {
      headers: this.headers,
    });
  }
}
