import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();

  messages: Message[] = [];
  maxContactId: number;

  constructor(private http: HttpClient) {
    this.maxContactId = this.getMaxId();
  }

  getMessages() {
    this.http.get<Message[]>('http://localhost:3000/messages').subscribe(
      (messages: Message[]) => {
        this.messages = messages || [];
        this.maxContactId = this.getMaxId();
        this.messageChangedEvent.next(this.messages.slice());
      },
      (error: any) => {
        console.error('Error fetching messages:', error);
      }
    );
  }

  storeMessages() {}

  getMessage(id: string) {
    return this.messages.find((doc) => doc.id === id) || null;
  }

  getMaxId(): number {
    let maxId = 0;

    for (const message of this.messages) {
      const currentId = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  addMessage(newMessage: Message) {
    // ;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: string; newMessage: Message }>(
        'http://localhost:3000/messages',
        newMessage,
        { headers }
      )
      .subscribe({
        next: (responseData) => {
          this.messages.push(responseData.newMessage);
          this.messageChangedEvent.next(this.messages.slice());
        },
        error: (error) => {
          console.error('Error on updating messages on the server:', error);
        },
      });
  }
}
