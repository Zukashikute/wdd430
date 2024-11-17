import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.scss',
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.getMessages();
    
    this.messageService.messageChangedEvent.subscribe((message: Message[]) => {
      this.messages = message;
    });
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
