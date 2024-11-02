import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new Subject<Contact>();
  contacts: Contact[] = [];
  maxContactId: number;

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
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

  addContact(contact: Contact) {
    if (!document) {
      return;
    }

    this.maxContactId++;
    contact.id = this.maxContactId.toString();
    this.contacts.push(contact);
    const contactListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone);
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
    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }

  deleteContact(contact: Contact) {
    if (!document) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }
}
