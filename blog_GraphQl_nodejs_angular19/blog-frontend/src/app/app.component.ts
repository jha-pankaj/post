import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AddPostComponent } from './components/add-post/add-post.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { UserComponent } from './components/user/user.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'blog-frontend';
}
