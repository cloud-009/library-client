import { Component, inject } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { User, UserType } from '../../interface';

export interface Navigation {
  value: string;
  link: string;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

  public panelName: string = '';
  public navigationItems: Array<Navigation> = [];
  private service: ApiService = inject(ApiService);
  private router: Router = inject(Router);

  constructor() {
    this.service.loginStatus.subscribe({
      next: (res: string) => {
        if (res === 'loggedIn') {
          this.router.navigate(['/profile']);
          let user: User | null = this.service.getUserInfo();
          if (user !== null) {
            if (user.userType === UserType.ADMIN) {
              this.panelName = "Admin Panel";
              this.navigationItems = [
                { value: 'View Books', link: '/home' },
                { value: 'Maintenance', link: '/maintenance' },
                { value: 'Return Book', link: '/return-book' },
                { value: 'View Users', link: '/view-users' },
                { value: 'Aprooval Requests', link: '/approval-requests' },
                { value: 'All Orders', link: '/all-orders' },
                { value: 'My Orders', link: '/my-orders' },
              ];
            } else if (user.userType === UserType.STUDENT) {
              this.panelName = "Student Panel";
              this.panelName = 'Student Panel';
              this.navigationItems = [
                { value: 'View Books', link: '/home' },
                { value: 'My Orders', link: '/my-orders' },
              ];
            }
          }
        } else if (res === 'loggedOff') {
          this.panelName = 'Auth Panel';
          this.router.navigateByUrl('/login');
          this.navigationItems = [];
        }
      }
    })
  }

}
