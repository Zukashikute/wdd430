import { Component, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.scss',
})
export class ContactItemComponent {
  @Input() contact: Contact;

  constructor(private contactService: ContactService) {}

  onSelectContact() {
    this.contactService.contactSelectedEvent.emit(this.contact);
  }
}
