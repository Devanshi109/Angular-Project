import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  count: number = 0;
  history: string[] = [];
  undo_arr: { ur: string, value: number }[] = [];
  redo_arr: { ur: string, value: number }[] = [];

  countChange(value: number): void {
    const lastCount = this.count;
    this.count += value;

    const ur = value > 0 ? `+${value}` : `${value}`;
    this.history.unshift(`${ur} (${lastCount} -> ${this.count})`);

    this.undo_arr.push({ ur, value });
    this.redo_arr = [];

    if (this.undo_arr.length > 50) {
      this.undo_arr.shift();
      this.history.pop();
    }
  }

  undo() {
    if (!this.undo_arr.length) return;

    const lastAction = this.undo_arr.pop()!;
    this.count -= lastAction.value;
    this.redo_arr.push(lastAction);
    this.history.shift();
  }

  redo() {
    if (!this.redo_arr.length) return;

    const lastRedo = this.redo_arr.pop()!;
    this.count += lastRedo.value;
    this.undo_arr.push(lastRedo);
    this.history.unshift(`${lastRedo.ur} (${this.count - lastRedo.value} -> ${this.count})`)
  }

}
