import { NgModule } from '@angular/core';
import { UserOrderComponent } from './user-order/user-order.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { ApprovalRequestComponent } from './approval-request/approval-request.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { FormsModule } from '@angular/forms';
import { ViewUserComponent } from './view-user/view-user.component';



@NgModule({
  declarations: [
    UserOrderComponent,
    ProfileComponent,
    ApprovalRequestComponent,
    AllOrdersComponent,
    ViewUserComponent
  ],
  imports: [
    SharedModule,
    FormsModule
  ],
  exports: [
    UserOrderComponent,
    ProfileComponent,
    ApprovalRequestComponent,
    AllOrdersComponent,
    ViewUserComponent
  ]
})
export class UsersModule { }
