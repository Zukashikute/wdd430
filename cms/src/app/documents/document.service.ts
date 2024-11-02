import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new Subject<Document>();
  documents: Document[] = [];
  maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string) {
    return this.documents.find((doc) => doc.id === id) || null;
  }

  getMaxId(): number {
    let maxId = 0;

    for (const document of this.documents) {
      const currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  addDocument(document: Document) {
    if (!document) {
      return;
    }

    this.maxDocumentId++;
    document.id = this.maxDocumentId.toString();
    this.documents.push(document);
    const documentListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentListClone);
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    let pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    
    this.documents.splice(pos, 1);
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }
}
