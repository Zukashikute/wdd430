import { Component } from '@angular/core';

@Component({
  selector: 'app-twoway',
  templateUrl: './twoway.component.html',
  styleUrl: './twoway.component.scss',
})
export class TwowayComponent {
  username = '';

  resetField() {
    this.username = '';
  }

}
