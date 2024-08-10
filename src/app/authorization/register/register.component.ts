import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm!:FormGroup;
  private formBuilder:FormBuilder = inject(FormBuilder);
  private service:ApiService = inject(ApiService);
  private snackBar:MatSnackBar = inject(MatSnackBar);
  public hidePassword:boolean = true;
  public hideRepeatPassword:boolean = true;

  constructor() {
    this.registerForm = this.formBuilder.group({
      firstName: this.formBuilder.control('', [Validators.required]),
      lastName: this.formBuilder.control('', [Validators.required]),
      email: this.formBuilder.control('', [Validators.required]),
      mobile: this.formBuilder.control('', [Validators.required]),
      password: this.formBuilder.control('', [Validators.required]),
      repeatPassword: this.formBuilder.control('', [Validators.required]),
    })
  }

  registerUser() {
    let user = {
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      email: this.registerForm.get('email')?.value,
      mobile: this.registerForm.get('mobile')?.value,
      password: this.registerForm.get('password')?.value,
    };
    this.service.registerUser(user).subscribe({
      next:(res:any) =>{
        this.snackBar.open(res, "Ok");
      }, error:(err:HttpErrorResponse)=>{
        console.log(err);
      }
    })
  }
}
