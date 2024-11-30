// src/app/services/comment.service.ts
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private apollo: Apollo) {}

  getComments(postId: string) {
    return this.apollo.query({
      query: gql`
        query ($postId: ID!) {
          comments(postId: $postId) {
            id
            content
            user {
              name
            }
            createdAt
          }
        }
      `,
      variables: { postId },
    });
  }

  addComment(content: string, userId: string | undefined, postId: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($content: String!, $userId: ID!, $postId: ID!) {
          addComment(content: $content, userId: $userId, postId: $postId) {
            id
            content
          }
        }
      `,
      variables: { content, userId, postId },
    });
  }
}
