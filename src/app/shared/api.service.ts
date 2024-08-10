import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Subject } from 'rxjs';
import { Book, BookCategory, Order, User, UserType } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private URL: string = "https://localhost:7030/api/Library";
  public loginStatus: Subject<string> = new Subject();
  private jwtService: JwtHelperService = inject(JwtHelperService);

  constructor(private http: HttpClient) { }

  registerUser(user: any) {
    return this.http.post(`${this.URL}/Register`, user, {
      responseType: 'text'
    });
  }

  loginUser(info: any) {
    let params = new HttpParams()
      .append("email", info.email)
      .append("password", info.password);
    return this.http.get(`${this.URL}/Login`, {
      params: params,
      responseType: 'text'
    })
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('access_token') !== null && !this.jwtService.isTokenExpired()) {
      return true;
    }
    return false;
  }

  getUserInfo(): User | null {
    if (!this.isLoggedIn()) return null;
    var decodeToken = this.jwtService.decodeToken();
    var user: User = {
      id: decodeToken.id,
      firstName: decodeToken.firstName,
      lastName: decodeToken.lastName,
      email: decodeToken.email,
      mobileNumber: decodeToken.mobileNumber,
      password: '',
      userType: UserType[decodeToken.userType as keyof typeof UserType],
      accountStatus: decodeToken.accountStatus,
      createdOn: decodeToken.createdOn,
    };
    return user;
  }

  logout() {
    localStorage.removeItem('access_token');
    this.loginStatus.next('loggedOff');
  }

  getBooks() {
    return this.http.get<Array<Book>>(`${this.URL}/GetBooks`);
  }

  orderBooks(book: Book) {
    let userId = this.getUserInfo()!.id;
    let params = new HttpParams()
      .append('userId', userId)
      .append('bookId', book.id);
    return this.http.post(`${this.URL}/OrderBooks`, null, {
      params: params,
      responseType: 'text'
    })
  }

  getOrdersOfUser(userId: number) {
    let params = new HttpParams()
      .append('userId', userId);
    return this.http.get<any>(`${this.URL}/GetOrdersOfUser`, {
      params: params
    }).pipe(
      map((orders) => {
        let newOrders = orders.map((order: any) => {
          let newOrder: Order = {
            id: order.id,
            userId: order.userId,
            userName: order.user.firstName + "" + order.user.lastName,
            bookId: order.bookId,
            bookTitle: order.book.title,
            orderDate: order.orderDate,
            returned: order.returned,
            returnDate: order.returnDate,
            finePaid: order.finePaid
          }
          return newOrder;
        })
        return newOrders;
      })
    )
  }

  getFine(order: Order): number {
    let today = new Date();
    let orderDate = new Date(Date.parse(order.orderDate));
    orderDate.setDate(orderDate.getDate() + 10);

    if (orderDate.getTime() < today.getTime()) {
      var diff = today.getTime() - orderDate.getTime();
      let days = Math.floor(diff / (1000 * 86400));
      return days * 50;
    }
    return 0;
  }

  addNewCategory(category: BookCategory) {
    return this.http.post(`${this.URL}/AddCategory`, category, {
      responseType: 'text'
    });
  }

  getCategories() {
    return this.http.get<Array<BookCategory>>(`${this.URL}/GetCategories`);
  }

  addNewBook(book: Book) {
    return this.http.post(`${this.URL}/AddBook`, book, {
      responseType: 'text'
    })
  }

  deleteBook(id: number) {
    return this.http.delete(`${this.URL}/DeleteBook`, {
      params: new HttpParams().append('id', id),
      responseType: 'text'
    })
  }

  returnBook(userId: string, bookId: string, fine: number) {
    return this.http.get(`${this.URL}/ReturnBook`, {
      params: new HttpParams()
        .append('userId', userId)
        .append('bookId', bookId)
        .append('fine', fine),
      responseType: 'text'
    });
  }

  public getUsers() {
    return this.http.get<Array<User>>(`${this.URL}/GetUsers`);
  }

  public approveRequest(userId: number) {
    return this.http.get(`${this.URL}/ApproveRequest`, {
      params: new HttpParams().append('userId', userId),
      responseType: 'text'
    });
  }

  getOrders() {
    return this.http.get<any>(`${this.URL}/GetOrders`).pipe(
      map((orders) => {
        let newOrders = orders.map((order: any) => {
          let newOrder: Order = {
            id: order.id,
            userId: order.userId,
            userName: order.user.firstName + ' ' + order.user.lastName,
            bookId: order.bookId,
            bookTitle: order.book.title,
            orderDate: order.orderDate,
            returned: order.returned,
            returnDate: order.returnDate,
            finePaid: order.finePaid,
          };
          return newOrder;
        });
        return newOrders;
      })
    );
  }

  sendEmail() {
    return this.http.get(`${this.URL}/SendEmailForPendingReturns`, {
      responseType: 'text',
    });
  }

  blockUsers() {
    return this.http.get(`${this.URL}/BlockFineOverdueUsers`, {
      responseType: 'text',
    });
  }

  unblock(userId: number) {
    return this.http.get(`${this.URL}/Unblock`, {
      params: new HttpParams().append("userId", userId),
      responseType: "text",
    });
  }
}
