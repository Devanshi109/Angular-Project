import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, Subject, tap } from 'rxjs';
import { BookRes, ExpectBook, ItemsEntity } from './interfaces/book-interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
  bookSignal = signal<ExpectBook[]>([]);
  wishListSignal = signal<string[]>([]); 

  constructor(private http: HttpClient) { }

  getBooks(name: string) {
    return this.http.get<BookRes>(this.baseUrl + name).pipe(
      map((res: BookRes) => {
        return (
          res.items
            ?.filter(({ volumeInfo: info }: ItemsEntity) => {
              return (
                !!info.title &&
                !!info.authors &&
                !!info.imageLinks?.thumbnail &&
                !!info.publisher &&
                !!info.publishedDate &&
                !!info.description
              );
            })
            .map(({ volumeInfo: info }: ItemsEntity) => {
              return {
                bookName: info.title,
                bookPic: info.imageLinks?.thumbnail,
                publisher: info.publisher,
                publishDate: info.publishedDate,
                description: info.description,
                author: info.authors ? info.authors.join(', ') : 'Unknown Author',
              } as ExpectBook;
            }) || []
        );
      }),
      catchError((err) => {
        console.error(err);
        this.bookSignal.set([]);
        return of([]);
      }),
      map((books) => {
        this.bookSignal.set(books);
        return books;
      })
    );
  }

  addToWishList(book: ExpectBook) {
    if (!this.wishListSignal().includes(book.bookName)) {
      this.wishListSignal.update((list) => [...list, book.bookName]);
    }
  }

  removeFromWishlist(book: string) {
    this.wishListSignal.update((list) => list.filter((b) => b !== book));
  }

}
