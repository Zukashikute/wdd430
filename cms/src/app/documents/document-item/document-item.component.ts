import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-item',
  templateUrl: './document-item.component.html',
  styleUrl: './document-item.component.scss',
})
export class DocumentItemComponent {
  @Input() document: Document;
  @Output() selectedDocumentEvent = new EventEmitter<void>();

  onSelectDocument() {
    this.selectedDocumentEvent.emit();
  }
}
