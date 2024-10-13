import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.scss',
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents = [
    new Document(
      '1',
      'CIT 260 - Object Oriented Programming',
      'In this course you will learn Object Oriented Programming and the Java programming language by designing and creating a simple game',
      'https://content.byui.edu/file/22c0260d-e1b7-43a2-8903-8d8f948041ee/4/syllabus.html'
    ),
    new Document(
      '2',
      'WDD 340 - Web Full Stack Development',
      'Learn how to develop modern web applications using the MEAN stack',
      'https://byui.instructure.com/courses/313502/assignments/syllabus'
    ),
    new Document(
      '3',
      'CIT 327 - Data Warehousing',
      'This course defines the theory and practice of how database warehouse systems are designed and managed.',
      'https://byui.instructure.com/courses/54546/assignments/syllabus'
    ),
    new Document(
      '4',
      'CSE 232 - Designing Data Structure',
      'The purpose of CSE 232 is to build upon the foundation of CSE 212 (Programming with Data Structures) and CSE 231 (Inheritance Design) to learn how to design, build, and manipulate data structures.',
      'https://byui.instructure.com/courses/61552/assignments/syllabus'
    ),
    new Document(
      '4',
      'WDD 330 - Web Frontend Development II',
      'This course is designed to give students the skills required to create web applications using HTML, CSS , and JavaScript.',
      'https://byui.instructure.com/courses/54972/assignments/syllabus'
    ),
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
