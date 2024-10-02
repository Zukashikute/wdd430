import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrl: './game-control.component.scss',
})
export class GameControlComponent {
  @Output() intervalFired = new EventEmitter<number>();
  interval;
  lastNumber = 0;

  onGameStart() {
    this.interval = setInterval(() => {
      this.intervalFired.emit(this.lastNumber + 1);
      this.lastNumber++;
    }, 1000);
  }

  onGamePause() {
    clearInterval(this.interval);
  }
}
