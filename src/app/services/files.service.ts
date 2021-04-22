import { HttpHeaders, HttpClient } from '@angular/common/http';
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
  headers = new HttpHeaders()
    .set('auth-token', localStorage.getItem('token'))
    .set(
      'Content-Type',
      'multipart/form-data; boundary=<calculated when request is sent>'
    );

  constructor(private http: HttpClient) {}

  NewImgUpload(file: File): Observable<any> {
    const formData: FormData = new FormData();
    console.log(file);
    formData.append('one-file', file, file.name);
    console.log(JSON.stringify(formData));

    return this.http.post<File>(`${this.apiUrl}/files/new-file`, formData, {
      reportProgress: true,
      responseType: 'json',
      headers: this.headers,
    });
  }
  getFiles(): Observable<any> {
    return this.http.get(`${this.imgUrl}/files`);
  }
}
