import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from '../../interface';

@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrl: './return-book.component.scss'
})
export class ReturnBookComponent {

  public returnForm!: FormGroup;
  private formBuilder: FormBuilder = inject(FormBuilder);
  private service: ApiService = inject(ApiService);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  public fineToPay: number | null = null;

  constructor() {
    this.returnForm = this.formBuilder.group({
      userId: this.formBuilder.control(null, [Validators.required]),
      bookId: this.formBuilder.control(null, [Validators.required]),
    })
  }

  public getFine() {
    let userId = this.returnForm.get('userId')?.value;
    let bookId = this.returnForm.get('bookId')?.value;

    this.service.getOrdersOfUser(userId).subscribe({
      next: (res: Array<Order>) => {
        if (res.some(o => !o.returned && o.bookId == bookId)) {
          let order: Order = res.filter(o => o.bookId == bookId)[0];
          this.fineToPay = this.service.getFine(order);
          console.log(this.fineToPay)
        }
      }, error: (err: any) => {
        this.snackBar.open(`User does not have book with ID: ${bookId}`, 'Ok');
        console.log(err);
      }
    })
  }

  public returnBook() {
    let userId = this.returnForm.get('userId')?.value;
    let bookId = this.returnForm.get('bookId')?.value;

    this.service.returnBook(userId, bookId, this.fineToPay as number).subscribe({
      next: res => {
        if (res === 'returned') {
          this.snackBar.open('Book has been returned!', 'Ok');
        } else {
          this.snackBar.open('Book has not been returned', 'Ok');
        }
      }, error: err => {
        console.log(err);
      }
    })
  }


}
