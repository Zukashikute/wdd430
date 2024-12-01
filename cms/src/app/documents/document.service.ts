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
    this.http.get<Document[]>('http://localhost:3000/documents').subscribe(
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

  addDocument(document: Document) {
    if (!document) {
      return;
    }

    // make sure id of the new Document is empty
    document.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; document: Document }>(
        'http://localhost:3000/documents',
        document,
        { headers: headers }
      )
      .subscribe({
        next: (responseData) => {
          this.documents.push(responseData.document);
          this.documents.sort((a, b) =>
            a.name < b.name ? -1 : a.name > b.name ? 1 : 0
          );
          this.documentListChangedEvent.next(this.documents.slice());
        },
        error: (error) => {
          console.error('Error adding document:', error);
        },
      });
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex((d) => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    // newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put(
        'http://localhost:3000/documents/' + originalDocument.id,
        newDocument,
        { headers: headers }
      )
      .subscribe((response: Response) => {
        this.documents[pos] = newDocument;
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.findIndex((d) => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http
      .delete('http://localhost:3000/documents/' + document.id)
      .subscribe((response: Response) => {
        this.documents.splice(pos, 1);
        this.documents.sort((a, b) =>
          a.name < b.name ? -1 : a.name > b.name ? 1 : 0
        );
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }
}
