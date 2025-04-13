import { Component, computed, inject } from '@angular/core';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-booklist',
  standalone: false,
  
  templateUrl: './booklist.component.html',
  styleUrl: './booklist.component.css'
})
export class BooklistComponent {
  books = computed(() => this.bookService.bookSignal());
  private bookService = inject(BookService);

  constructor() {}

}
