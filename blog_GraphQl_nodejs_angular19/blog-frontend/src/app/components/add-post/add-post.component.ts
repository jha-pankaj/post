import { Component, inject, output } from '@angular/core';
import { PostService } from '../../services/post.service';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import SnackBar
import { AuthService } from '../../services/auth.service';
import { MatInputModule } from '@angular/material/input'; // For input fields
import { MatButtonModule } from '@angular/material/button'; // For buttons
import { MatCardModule } from '@angular/material/card'; // For cards
import { MatFormFieldModule } from '@angular/material/form-field'; // For form fields
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // For loading spinner
import { MatSnackBarModule } from '@angular/material/snack-bar'; // For snack bars

@Component({
  selector: 'app-add-post',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss',
})
export class AddPostComponent {
  loading = false;
  postForm!: FormGroup;
  onPostSuccess = output<string>();
  authService = inject(AuthService);
  constructor(
    private postService: PostService,
    private userService: UserService,
    private fb: FormBuilder,

    private snackBar: MatSnackBar
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
      content: ['', [Validators.required, Validators.minLength(1)]],
    });
  }
  get title() {
    return this.postForm.get('title');
  }

  get content() {
    return this.postForm.get('content');
  }
  onSubmit() {
    if (this.postForm.invalid) {
      return;
    }
    this.addPost();
  }

  addPost() {
    this.loading = true;
    this.postService
      .addPost(
        this.postForm.value.title,
        this.postForm.value.content,
        this.authService.userId()
      )
      .subscribe(
        (res) => {
          this.loading = false;
          this.onPostSuccess.emit("success")
          window.scrollTo({ top: 0, behavior: 'smooth' });
          this.postForm.reset();
          this.snackBar.open('Post added successfully!', '', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
        },
        (er: Error) => {
          this.loading = false;
          this.snackBar.open('Error adding post. Please try again.', '', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
        }
      );
  }


}
