import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { BlogComponent } from './components/blog/blog.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'blog', component: BlogComponent ,
    canActivate: [authGuard],
    children: [
      { path: 'posts', component: PostListComponent , canActivate: [authGuard]},
     { path: '', redirectTo: 'posts', pathMatch: 'full' }, // Redirect to a default child
    ]

  },


  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
