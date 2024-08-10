import { Routes } from '@angular/router';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';
import { RegisterComponent } from './authorization/register/register.component';
import { LoginComponent } from './authorization/login/login.component';
import { BookStoreComponent } from './books/book-store/book-store.component';
import { UserOrderComponent } from './users/user-order/user-order.component';
import { ProfileComponent } from './users/profile/profile.component';
import { MaintenanceComponent } from './books/maintenance/maintenance.component';
import { ReturnBookComponent } from './books/return-book/return-book.component';
import { ApprovalRequestComponent } from './users/approval-request/approval-request.component';
import { AllOrdersComponent } from './users/all-orders/all-orders.component';
import { ViewUserComponent } from './users/view-user/view-user.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: BookStoreComponent },
    { path: 'my-orders', component: UserOrderComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'maintenance', component: MaintenanceComponent },
    { path: 'return-book', component: ReturnBookComponent },
    { path: 'approval-requests', component: ApprovalRequestComponent },
    { path: 'all-orders', component: AllOrdersComponent },
    { path: 'view-users', component: ViewUserComponent },
    { path: '**', component: PagenotfoundComponent }
];
