import { Component } from '@angular/core';

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html',
  styleUrl: './directive.component.scss',
})
export class DirectiveComponent {
  count = 0;
  isShowing = false;
  logs: number[] = [];

  toggleItem() {
    this.isShowing = !this.isShowing; // Toggle visibility
    this.logs.push(this.logs.length + 1);
    if (this.isShowing) {
      this.count++; // Increment count only when showing the item
    }
  }

  getColor() {
    return this.count > 4 ? 'blue' : 'transparent';
  }
}
