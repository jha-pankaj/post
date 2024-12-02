import { Component, inject } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule ,FormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule,FormsModule,RouterLink,MatProgressSpinnerModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  isLoading= false;
  router = inject(Router);
  constructor(private fb: FormBuilder ,private userService:UserService, private authService:AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    if (this.loginForm?.valid) {
      console.log('Login successful', this.loginForm.value);
      this.isLoading=true;
      this.userService.getUserByEmail(this.loginForm.value.email).subscribe((res) => {
        console.log("bbbb",res)
        this.authService.login(res.data.userByEmail.name,res.data.userByEmail.email,res.data.userByEmail.id)
        this.router.navigate(['/blog']);
      },(error:Error)=>{
        console.log("error")
        this.isLoading=false;
      });
    }
  }
}
