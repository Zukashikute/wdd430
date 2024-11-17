import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new Subject<Document>();
  documents: Document[] = [];
  maxDocumentId: number;

  constructor(private http: HttpClient) {
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments() {
    this.http
      .get<Document[]>(
        'https://wdd430-cms-d3a04-default-rtdb.asia-southeast1.firebasedatabase.app/documents.json'
      )
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents || [];
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) =>
            a.name < b.name ? -1 : a.name > b.name ? 1 : 0
          );
          this.documentListChangedEvent.next(this.documents.slice());
        },
        (error: any) => {
          console.error('Error fetching documents:', error);
        }
      );
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

  storeDocuments() {
    const stringifyDoc = JSON.stringify(this.documents);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put(
        'https://wdd430-cms-d3a04-default-rtdb.asia-southeast1.firebasedatabase.app/documents.json',
        stringifyDoc,
        { headers }
      )
      .subscribe(
        () => {
          this.documentListChangedEvent.next(this.documents.slice());
        },
        (error) => {
          console.error('Error on updating documents on the server:', error);
        }
      );
  }

  addDocument(document: Document) {
    if (!document) {
      return;
    }

    this.maxDocumentId++;
    document.id = this.maxDocumentId.toString();
    this.documents.push(document);

    this.storeDocuments();
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

    this.storeDocuments();
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

    this.storeDocuments();
  }
}
