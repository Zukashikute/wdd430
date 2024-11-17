import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new Subject<Contact>();
  contacts: Contact[] = [];
  maxContactId: number;

  constructor(private http: HttpClient) {
    this.maxContactId = this.getMaxId();
  }

  getContacts() {
    this.http
      .get<Contact[]>(
        'https://wdd430-cms-d3a04-default-rtdb.asia-southeast1.firebasedatabase.app/contacts.json'
      )
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts || [];
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) =>
            a.name < b.name ? -1 : a.name > b.name ? 1 : 0
          );
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.error('Error fetching contacts:', error);
        }
      );
  }

  getContact(id: string) {
    return this.contacts.find((contact) => contact.id === id) || null;
  }

  getMaxId(): number {
    let maxId = 0;

    for (const contact of this.contacts) {
      const currentId = +contact.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  storeContacts() {
    const stringifyDoc = JSON.stringify(this.contacts);
    console.log('Data being sent to Firebase:', stringifyDoc);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put(
        'https://wdd430-cms-d3a04-default-rtdb.asia-southeast1.firebasedatabase.app/contacts.json',
        stringifyDoc,
        { headers }
      )
      .subscribe(
        () => {
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        (error) => {
          console.error('Error on updating contacts on the server:', error);
        }
      );
  }

  addContact(contact: Contact) {
    if (!contact) {
      return;
    }

    this.maxContactId++;
    contact.id = this.maxContactId.toString();
    this.contacts.push(contact);

    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    let pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;

    this.storeContacts();
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);

    this.storeContacts();
  }
}
