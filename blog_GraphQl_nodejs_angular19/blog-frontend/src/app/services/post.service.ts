// src/app/services/post.service.ts
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private apollo: Apollo) {}

  getPosts() :Observable<any> {
    return this.apollo.query({
      query: gql`
        query {
          posts {
            id
            title
            content
            likes
            dislikes,
            createdAt,
            user {
              id
              name
              email
            }
            comments {
              id
              content
              createdAt
              user {
                id
                name
               email
              }
            }
          }
        }
      `,fetchPolicy: 'network-only'
    });
  }

  addPost(title: string, content: string, userId: string|undefined) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($title: String!, $content: String!, $userId: ID!) {
          addPost(title: $title, content: $content, userId: $userId) {
            id
            title
          }
        }
      `,
      variables: { title, content, userId },
    });
  }

  likePost(postId: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($postId: ID!) {
          likePost(postId: $postId) {
            id
            likes
          }
        }
      `,
      variables: { postId },
    });
  }

  dislikePost(postId: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($postId: ID!) {
          dislikePost(postId: $postId) {
            id
            dislikes
          }
        }
      `,
      variables: { postId },
    });
  }
}
