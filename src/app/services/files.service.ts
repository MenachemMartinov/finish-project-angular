import {
  HttpHeaders,
  HttpClient,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import url from '../commen/config';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  // default url request
  apiUrl = url.apiUrl;
  imgUrl = url.imgUrl;
  // this is default headers
  headers = new HttpHeaders().set('auth-token', localStorage.getItem('token'));

  constructor(private http: HttpClient) {}

  NewImgUpload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('one-file-upload', 'check 1');
    formData.append('one-file', file, file.name);

    const req = new HttpRequest(
      'POST',
      `${this.apiUrl}/files/new-file`,
      formData,
      {
        headers: this.headers,
        reportProgress: true,
        responseType: 'json',
      }
    );

    return this.http.request(req);
  }
  getFiles(): Observable<any> {
    return this.http.get(`${this.imgUrl}/files`);
  }
}
