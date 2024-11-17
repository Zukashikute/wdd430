import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contact.model';
@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.scss',
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    // const contact: Contact = this.contactService.getContact(
    //   this.message.sender
    // );
    // console.log(contact)
    // this.messageSender = contact.name;

    // Wait until contacts are available
    this.contactService.contactListChangedEvent.subscribe(
      (contacts: Contact[]) => {
        const contact = this.contactService.getContact(this.message.sender);
        if (contact) {
          this.messageSender = contact.name;
        } else {
          console.error(`Contact with ID ${this.message.sender} not found.`);
          this.messageSender = 'Unknown Sender'; // Fallback value
        }
      }
    );

    // If contacts are not yet fetched, fetch them
    if (this.contactService.contacts.length === 0) {
      this.contactService.getContacts();
    }
  }
}
