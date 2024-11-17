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
    this.http
      .get<Message[]>(
        'https://wdd430-cms-d3a04-default-rtdb.asia-southeast1.firebasedatabase.app/messages.json'
      )
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages || [];
          this.maxContactId = this.getMaxId();
          this.messageChangedEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.error('Error fetching contacts:', error);
        }
      );
  }

  storeMessages() {
    const stringifyDoc = JSON.stringify(this.messages);
    console.log('Data being sent to Firebase:', stringifyDoc);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put(
        'https://wdd430-cms-d3a04-default-rtdb.asia-southeast1.firebasedatabase.app/messages.json',
        stringifyDoc,
        { headers }
      )
      .subscribe(
        () => {
          this.messageChangedEvent.next(this.messages.slice());
        },
        (error) => {
          console.error('Error on updating messages on the server:', error);
        }
      );
  }

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

  addMessage(message: Message) {
    this.messages.push(message);
    this.storeMessages();
  }
}
