import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss',
})
export class ContactListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contacts = this.contactService.getContacts();

    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contactList: Contact[]) => {
        this.contacts = contactList;
      }
    );
  }

  onSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.next(contact);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
