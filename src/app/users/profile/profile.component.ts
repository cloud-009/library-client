import { Component, inject } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { UserType } from '../../interface';

export interface TableElement {
  name: string;
  value: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  public profileColumns: Array<string> = ['name', 'value'];
  dataSource: Array<TableElement> = [];
  private service: ApiService = inject(ApiService);
  public currentValue:string = '';
  public taskList:Array<string> =[];

  constructor() {
    let user = this.service.getUserInfo()!;
    this.dataSource = [
      { name: "Name", value: user.firstName + " " + user.lastName },
      { name: "Email", value: `${user.email}` },
      { name: "Mobile Number", value: `${user.mobileNumber}` },
      { name: "Account Status", value: `${user.accountStatus}` },
      { name: "Create On", value: `${user.createdOn}` },
      { name: "Type", value: `${UserType[user.userType]}` },
    ]
  }
}
