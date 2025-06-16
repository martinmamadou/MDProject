import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../../core/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      created_at: new Date(),
      role: ['user', Validators.required]
    })
  }

  public Register() {
    this.authService.Register(this.registerForm.value).subscribe({
      next: (res) => {
        console.log('user registered successfully', res);
        this.router.navigate(['/auth/welcome']);
      },
      error: (err) => console.log('registeration error', err)
    })
  }
}
