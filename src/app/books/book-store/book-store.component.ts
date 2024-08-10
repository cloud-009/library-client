import { Component, inject, OnInit } from '@angular/core';
import { Book, BooksByCategory } from '../../interface';
import { ApiService } from '../../shared/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-store',
  templateUrl: './book-store.component.html',
  styleUrl: './book-store.component.scss'
})
export class BookStoreComponent implements OnInit {

  private service: ApiService = inject(ApiService);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  public books: Array<Book> = [];
  public booksToDisplay: Array<BooksByCategory> = [];

  public tableColumns: Array<string> = ['id', 'title', 'author', 'price', 'available', 'order'];

  ngOnInit(): void {
    this.service.getBooks().subscribe({
      next: res => {
        this.books = [];
        res.forEach(b => this.books.push(b));
        this.updateList();
      }, error: err => {
        console.log(err);
      }
    })
  }

  public searchBooks(value: string) {
    this.updateList();
    value = value.toLowerCase();
    this.booksToDisplay = this.booksToDisplay.filter((bookToDisplay) => {
      bookToDisplay.books = bookToDisplay.books.filter((book) => {
        return book.title.toLowerCase().includes(value);
      });
      return bookToDisplay.books.length > 0;
    });
  }

  private updateList() {
    this.booksToDisplay = [];
    for (let book of this.books) {
      let categoryExist = false;
      let categoryBook: BooksByCategory | null;
      for (let booksToDisplay of this.booksToDisplay) {
        if (booksToDisplay.bookCategoryId === book.bookCategoryId) {
          categoryExist = true;
          categoryBook = booksToDisplay;
        }
      }
      if (categoryExist) {
        categoryBook!.books.push(book);
      } else {
        this.booksToDisplay.push({
          bookCategoryId: book.bookCategoryId,
          category: book.bookCategory.category,
          subCategory: book.bookCategory.subCategory,
          books: [book]
        })
      }
    }
  }

  public orderBook(book: Book) {
    this.service.orderBooks(book).subscribe({
      next: res => {
        if (res === 'ordered') {
          book.ordered = true;
          let today = new Date();
          let returnDate = new Date();
          returnDate.setDate(today.getDate() + 10);
          this.snackBar.open(`${book.title} has been ordered! You will have to return it on ${returnDate.toDateString()}`, 'Ok');
        } else {
          this.snackBar.open('You have already 3 orders pending to return!!', 'Ok');
        }
      }, error: err => {
        console.log(err);
      }
    })
  }
}
