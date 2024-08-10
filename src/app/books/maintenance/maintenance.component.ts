import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Book, BookCategory } from '../../interface';
import { ApiService } from '../../shared/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface CategoryOption {
  displayName: string;
  value: number;
}

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.scss'
})
export class MaintenanceComponent {

  public newCategoryForm: FormGroup;
  public newBookForm: FormGroup;
  public deleteForm: FormControl;
  private formBuilder: FormBuilder = inject(FormBuilder);
  private service: ApiService = inject(ApiService);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  public categoryOptions: Array<CategoryOption> = [];

  constructor() {
    /**
     * BookCategory Form builder
     */
    this.newCategoryForm = this.formBuilder.group({
      category: this.formBuilder.control('', [Validators.required]),
      subCategory: this.formBuilder.control('', [Validators.required]),
    });

    /**
     * Book Form builder
     */
    this.newBookForm = this.formBuilder.group({
      title: this.formBuilder.control('', [Validators.required]),
      author: this.formBuilder.control('', [Validators.required]),
      price: this.formBuilder.control(0, [Validators.required]),
      category: this.formBuilder.control(-1, [Validators.required]),
    });

    /**
     * Delete Form builder
     */
    this.deleteForm = this.formBuilder.control('', [Validators.required]);

    this.service.getCategories().subscribe({
      next: (res: Array<BookCategory>) => {
        res.forEach(c => {
          this.categoryOptions.push({
            value: c.id,
            displayName: `${c.category} / ${c.subCategory}`
          })
        })
      }, error: (err: any) => {
        console.log(err);
      }
    })
  }

  public addNewCategory() {
    let bookCategory: BookCategory = {
      id: 0,
      category: this.newCategoryForm.get('category')?.value,
      subCategory: this.newCategoryForm.get('subCategory')?.value,
    };
    this.service.addNewCategory(bookCategory).subscribe({
      next: res => {
        if (res === 'cannot insert') {
          this.snackBar.open('Already Exists!', 'Ok');
        } else {
          this.snackBar.open('Added new book category', 'Ok');
        }
      }, error: err => {
        console.log(err)
      }
    })
  }

  public addNewBook() {
    let book: Book = {
      id: 0,
      title: this.newBookForm.get('title')?.value,
      author: this.newBookForm.get('author')?.value,
      price: this.newBookForm.get('price')?.value,
      ordered: false,
      bookCategoryId: this.newBookForm.get('category')?.value,
      bookCategory: { id: 0, category: '', subCategory: '' }
    };
    this.service.addNewBook(book).subscribe({
      next: res => {
        if (res === 'inserted') {
          this.snackBar.open('Book Added', 'Ok');
        }
      }
    })
  }

  public deleteExistingBook() {
    let id = this.deleteForm.value;
    this.service.deleteBook(id).subscribe({
      next: res => {
        if (res === 'deleted') {
          this.snackBar.open('Book Deleted Successfully!', 'Ok');
        }
      }, error: (err) => {
        this.snackBar.open('Book does not exist', 'Ok');
        console.log(err);
      }
    })
  }
}
