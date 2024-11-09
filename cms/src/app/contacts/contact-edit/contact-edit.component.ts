import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.scss',
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];

      if (!id) {
        this.editMode = false;
        return;
      }

      this.originalContact = this.contactService.getContact(id);

      if (!this.originalContact) {
        return;
      }

      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));

      if (this.contact.group) {
        this.groupContacts = JSON.parse(JSON.stringify(this.groupContacts));
      }
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newContact = new Contact(
      value.id,
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      value.group
    );
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['contacts']);
  }

  onCancel() {
    this.router.navigate(['contacts']);
  }

  onDrop(event: CdkDragDrop<Contact[]>) {
    const movedItem = event.item.data;
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;

    moveItemInArray(this.groupContacts, previousIndex, currentIndex);
  }

  isContactInGroup(contact: Contact) {
    return this.groupContacts.some(
      (existingContact) => existingContact.id === contact.id
    );
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;

    const invalidGroupContact = this.isInvalidContact(selectedContact);

    if (invalidGroupContact) {
      return;
    }

    this.groupContacts.push(selectedContact);
  }

  removeContactFromGroup(contact: Contact) {
    const index = this.groupContacts.findIndex(
      (existingContact) => existingContact.id === contact.id
    );
    if (index !== -1) {
      this.groupContacts.splice(index, 1);
    } else {
      console.log('Contact not found in the group.');
    }
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) return true;

    if (this.contact && newContact.id === this.contact.id) return true;

    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) return true;
    }

    return false;
  }

  onRemoveItem(index: number) {
    this.groupContacts.splice(index, 1);
  }
}
