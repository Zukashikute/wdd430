import { Component, Input } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-item',
  templateUrl: './document-item.component.html',
  styleUrl: './document-item.component.scss',
})
export class DocumentItemComponent {
  @Input() document: Document;

  constructor(private documentService: DocumentService) {}

  onSelectDocument() {
    this.documentService.documentSelectedEvent.next(this.document);
  }
}
