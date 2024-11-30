import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  userService = inject(UserService);
  authService = inject(AuthService);
  alreadyAccount = signal<Boolean>(false);
  router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Registration successful', this.registerForm.value);
      this.userService.getUserByEmail(this.registerForm.value.email).subscribe(
        (res) => {
          console.log('bbbb', res);
          this.alreadyAccount.set(true);
        },
        (error: Error) => {
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
