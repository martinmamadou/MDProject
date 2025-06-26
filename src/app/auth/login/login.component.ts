import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../../core/services/auth-service.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthServiceService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      login_date: [new Date()]
    })
  }

  public Login() {
    this.authService.Login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log('User logged in successfully', res);
        localStorage.setItem('access_token', res.access_token);
        console.log(this.loginForm.value);
      },
      error: (err) => console.error('Login error', err)
    });
  }
}
