import { Component, Input, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.scss',
})
export class DocumentDetailComponent implements OnInit {
  document: Document;
  nativeWindow: any;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    public route: ActivatedRoute,
    private windowRefService: WindRefService
  ) {
    this.nativeWindow = windowRefService.getNativeWindow();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.document = this.documentService.getDocument(id);
    });
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents'], { relativeTo: this.route });
  }
}
