import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { Apollo, gql } from 'apollo-angular';
import { CommentService } from '../../services/comment.service';
import { AuthService } from '../../services/auth.service';
import { AddPostComponent } from '../add-post/add-post.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-post-list',
  imports: [CommonModule,AddPostComponent,MatProgressSpinnerModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit {
  posts: any[] = [];
  loading = false;
  constructor(private postService: PostService,
    private apollo: Apollo,
     private commentService: CommentService,
    private authService :AuthService
    ) {}

  ngOnInit() {

    this.getPosts();

  }
  getPosts(){
    this.loading = true;
     const post$= this.postService.getPosts().subscribe((result: any) => {
      this.loading = false;
      this.posts = result.data.posts
     
      .map((post: any) => {
        return {
          ...post, // Spread the post properties into a new object
          comments: [...post.comments].sort((a: any, b: any) => {
            return Number(b.createdAt) - Number(a.createdAt); // Sort comments
          }),
        };
      })
      .sort((a: any, b: any) => {
        return Number(b.createdAt) - Number(a.createdAt); // Sort posts
      });
    });

  }
  onPostSuccess(ev:string){
    this.getPosts();
  }

  like(postId: string) {
    this.loading = true;
    this.postService.likePost(postId).subscribe(() => this.ngOnInit());
  }

  dislike(postId: string) {
    this.loading = true;
    this.postService.dislikePost(postId).subscribe(() => this.ngOnInit());
  }
  addComment(comment:string,postId:string){
    const uid = this.authService.userId();
    console.log(uid)
    this.loading = true;
    this.commentService.addComment(comment,uid,postId).subscribe((result: any) => {
      console.log("add comments")
        this.getPosts();

    });
  }
}
