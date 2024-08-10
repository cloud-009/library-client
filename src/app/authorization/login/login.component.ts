import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public loginForm!: FormGroup;
  private formBuilder: FormBuilder = inject(FormBuilder);
  private service: ApiService = inject(ApiService);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  public hidePassword: boolean = true;

  constructor() {
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required]),
      password: this.formBuilder.control('', [Validators.required]),
    })
  }

  loginUser() {
    let loginInfo = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this.service.loginUser(loginInfo).subscribe({
      next: (res: any) => {
        console.log(res)
        if (res === 'not found') {
          this.snackBar.open('Credentials are invalid!', 'Ok');
        } else if (res === 'unapproved') {
          this.snackBar.open('Your account is not approved by Admin!', 'Ok');
        } else if (res === 'blocked') {
          this.snackBar.open('Your account is BLOCKED. Please go to admin office to unblock!!', 'Ok');
        } else {
          localStorage.setItem('access_token', res);
          this.service.loginStatus.next("loggedIn");
        }
      }, error: (err: any) => {
        console.log(err);
      }
    })
  }
}
