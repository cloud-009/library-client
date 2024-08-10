import { Component, inject } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public name: string = '';
  public isLoggedIn: boolean = false;
  private service: ApiService = inject(ApiService);

  constructor() {
    this.service.loginStatus.subscribe({
      next: res => {
        if (res === 'loggedIn') {
          this.isLoggedIn = true;
          let user = this.service.getUserInfo();
          this.name = `${user?.firstName} ${user?.lastName}`;
        } else {
          this.isLoggedIn = false;
          this.name = '';
        }
      }
    })
  }

  logout() {
    this.service.logout();
  }
}
