import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IMessage } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/conversationTask';

  getMessagesTask(): Observable<IMessage[]> {
    return this.http.get<IMessage[]>(this.url)
  }

  addMessage(data: IMessage): Observable<IMessage> {
    return this.http.post<IMessage>(`${this.url}`, data)
  } 

}
