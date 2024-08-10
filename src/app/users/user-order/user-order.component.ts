import { Component, inject } from '@angular/core';
import { Order } from '../../interface';
import { ApiService } from '../../shared/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrl: './user-order.component.scss'
})
export class UserOrderComponent {

  public pendingReturns: Array<Order> = [];
  public completedReturns: Array<Order> = [];
  private service: ApiService = inject(ApiService);
  public columnsForPendingReturns: Array<string> = [
    'orderId',
    'bookId',
    'bookTitle',
    'orderDate',
    'fineToPay'
  ];
  public columnsForCompletedReturns: Array<string> = [
    'orderId',
    'bookId',
    'bookTitle',
    'orderDate',
    'returnedDate',
    'finePaid'
  ];

  constructor() {
    let userId = this.service.getUserInfo()!.id;
    this.service.getOrdersOfUser(userId).subscribe({
      next: res => {
        this.pendingReturns = res.filter((o: any) => !o.returned);
        this.completedReturns = res.filter((o: any) => o.returned);
      }, error: err => {
        console.log(err);
      }
    })
  }

  calculateFine(order: Order) {
    return this.service.getFine(order);
  }
}
