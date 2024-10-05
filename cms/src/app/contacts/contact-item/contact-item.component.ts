import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.scss',
})
export class ContactItemComponent {
  @Input() contact: Contact;
  @Output() selectedContactEvent = new EventEmitter<void>();

  onSelectContact() {
    this.selectedContactEvent.emit();
  }
}
