import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from 'src/app/config/config';

const baseUrl = config.api_baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  sendAttachment(attachmentFile, token): Observable<any> {
    const formData = new FormData();
    formData.append('file', attachmentFile)
    formData.append('token', token)
    return this.http.post(baseUrl + '/upload_attachment', formData)
  }

  saveToArchieve(params): Observable<any> {
    return this.http.post(baseUrl + '/save_archive_video', params)
  }
}
