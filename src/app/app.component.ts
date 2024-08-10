import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { ApiService } from './shared/api.service';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule, AuthorizationModule, UsersModule, BooksModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  private service: ApiService = inject(ApiService);

  ngOnInit(): void {
    let user = this.service.isLoggedIn() ? 'loggedIn' : 'loggedOff';
    this.service.loginStatus.next(user)
  }
}
