import { Component, Input } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.scss',
})
export class DocumentDetailComponent {
  @Input() document: Document;
}
