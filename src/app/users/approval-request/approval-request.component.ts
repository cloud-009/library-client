import { Component, inject } from '@angular/core';
import { AccountStatus, User } from '../../interface';
import { ApiService } from '../../shared/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-approval-request',
  templateUrl: './approval-request.component.html',
  styleUrl: './approval-request.component.scss'
})
export class ApprovalRequestComponent {

  public tableColumns: Array<string> = ['userId', 'userName', 'email', 'userType', 'createdOn', 'approve'];
  public users: Array<User> = [];
  private service: ApiService = inject(ApiService);
  private snackBar: MatSnackBar = inject(MatSnackBar);

  constructor() {
    this.service.getUsers().subscribe({
      next: (res) => {
        console.log(res)
        this.users = res.filter((r) => r.accountStatus == AccountStatus.UNAPPROVED);
      }, error: err => {
        console.log(err);
      }
    })
  }

  approve(user: User) {
    this.service.approveRequest(user.id).subscribe({
      next: res => {
        if (res === 'approved') {
          this.snackBar.open(`Request has been approved for ${user.id}`, 'Ok');
        } else {
          this.snackBar.open('Not approved', 'Ok');
        }
      }, error: err => {
        console.log(err);
      }
    })
  }

}
