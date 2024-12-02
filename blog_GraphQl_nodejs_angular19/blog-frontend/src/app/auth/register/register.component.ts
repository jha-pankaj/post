import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink,MatProgressSpinnerModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  userService = inject(UserService);
  authService = inject(AuthService);
  alreadyAccount = signal<Boolean>(false);
  router = inject(Router);
  isLoading = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      console.log('Registration successful', this.registerForm.value);
      this.userService.getUserByEmail(this.registerForm.value.email).subscribe(
        (res) => {
          console.log('bbbb', res);
          this.isLoading = false;
          this.alreadyAccount.set(true);
        },
        (error: Error) => {
          this.isLoading = false;
          this.userService
            .addUser(
              this.registerForm.value.name,
              this.registerForm.value.email
            )
            .subscribe((res: any) => {
              this.authService.login(
                res.data.addUser.name,
                res.data.addUser.email,
                res.data.addUser.id
              );
              this.router.navigate(['/blog']);
            });
        }
      );
    }
  }
}
