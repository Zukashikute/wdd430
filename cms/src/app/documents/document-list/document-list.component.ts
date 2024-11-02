import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.scss',
})
export class DocumentListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  documents: Document[] = [];

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.documents = this.documentService.getDocuments();

    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documentList: Document[]) => {
        this.documents = documentList;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
