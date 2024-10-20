import { Component, ElementRef, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.scss',
})
export class MessageEditComponent {
  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('msgText') msgTextInputRef: ElementRef;
  currentSender = Math.floor(Math.random() * 18) + 1;

  constructor(private messageService: MessageService) {}

  onSendMessage(event: Event) {
    event.preventDefault();
    const newMessage = new Message(
      '1',
      this.subjectInputRef.nativeElement.value,
      this.msgTextInputRef.nativeElement.value,
      this.currentSender.toString()
    );
    this.messageService.addMessage(newMessage);
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
  }
}
