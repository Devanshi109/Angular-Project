import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  count = 0;
  undo_arr: number[] = [];
  redo_arr: number[] = [];
  history: string[] = [];

  countChange(value: number): void {
    const lastCount = this.count;
    this.count += value;
    
    this.history.unshift(`${value > 0 ? '+' : ''}${value} (${lastCount} -> ${this.count})`);
    this.undo_arr.push(value);
    this.redo_arr = [];
    
    if (this.history.length > 50) {
      this.history.pop();
    } 
  }

  undo() {
    if (!this.undo_arr.length) return;
    
    const value = this.undo_arr.pop()!;
    this.count -= value;
    this.redo_arr.push(value);
    this.history.shift();
  }

  redo() {
    if (!this.redo_arr.length) return;
    
    const value = this.redo_arr.pop()!;
    this.countChange(value);
  }

}
