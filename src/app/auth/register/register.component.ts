import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as cryptoJs from 'crypto-js';
import { AuthServiceService } from '../../../core/services/auth-service.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthServiceService){
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email : ['', Validators.required],
      password : ['', Validators.required],
      created_at : new Date(),
      role: ['user', Validators.required]
    })
  }

  public Register(){
    this.authService.Register(this.registerForm.value).subscribe({
      next:(res) => console.log('user registered successfully',res),
      error:(err) => console.log('registeration error', err)  
    })
  }
}
