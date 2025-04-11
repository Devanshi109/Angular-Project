import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from '../../services/interface/todo';

@Component({
  selector: 'app-todo',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  loginService = inject(LoginService);
  router = inject(Router);
  taskInput = '';
  private counter = 0;
  tasks = signal<Task[]>([]);

  addTask() {
    const newTask : Task = { 
      id: this.counter++, 
      title: this.taskInput.trim(), 
      completed: false 
    };
    this.tasks.update(t => [...t, newTask]);
    this.taskInput = '';
  }

  toggle(task: Task) {
    this.tasks.update(t =>
      t.map(item => item.id === task.id ? { ...item, completed: !item.completed } : item)
    );
  }

  removeTask(id: number) {
    this.tasks.update(t => t.filter(item => item.id !== id));
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
