import { Component } from '@angular/core';

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html',
  styleUrl: './directive.component.scss',
})
export class DirectiveComponent {
  count = 0;
  isShowing = false;
  logs: any[] = [];

  toggleItem() {
    this.isShowing = !this.isShowing; // Toggle visibility
    this.logs.push(new Date());
    if (this.isShowing) {
      this.count++; // Increment count only when showing the item
    }
  }

  getColor() {
    return this.count > 4 ? 'blue' : 'transparent';
  }
}
