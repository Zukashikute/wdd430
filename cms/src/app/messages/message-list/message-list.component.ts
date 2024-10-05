import { Component, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.scss',
})
export class MessageListComponent {
  messages = [
    new Message('1', 'Hello', 'Joe', '208-496-3771'),
    new Message('2', 'Hi', 'Are you done on the assignment?', 'Red'),
    new Message(
      '2',
      'Yow',
      'What are we doing this week? Let us pair to work on it.',
      'Gray'
    ),
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
