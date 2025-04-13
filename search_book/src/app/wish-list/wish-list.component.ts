import { Component, computed, inject } from '@angular/core';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-wish-list',
  standalone: false,
  
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent {
  wishlist = computed(() => this.bookService.wishListSignal());
  private bookService = inject(BookService);

  constructor() {}

  removeFromWishlist(book: string) {
    this.bookService.removeFromWishlist(book);
  }

}
