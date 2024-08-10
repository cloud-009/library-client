import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { AccountStatus, Order, User } from '../../interface';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  @Input() columns: Array<string> = [];
  @Input() dataSource: Array<any> = [];

  @Output() approve = new EventEmitter<User>();
  @Output() unblock = new EventEmitter<User>();

  private service: ApiService = inject(ApiService);

  getFineToPay(order: Order) {
    return this.service.getFine(order);
  }

  getAccountStatus(value: AccountStatus): any {
    return AccountStatus[value];
  }

}
