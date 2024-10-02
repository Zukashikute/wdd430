import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-even',
  templateUrl: './even.component.html',
  styleUrl: './even.component.scss'
})
export class EvenComponent {
  @Input() number: number;
}
