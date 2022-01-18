import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';


// Post Query
const POST_QUERY = gql`
  query postQuery {
    getPosts {
      id
      username
      creationDate
      images {
        url
        alt
      }
      content
      comments {
        id
        username
        content
      }
      likes {
        id
        username
      }
      likesCount
      commentsCount
    }
  }
`;

// Get user's posts
const USERS_POSTS_QUERY = gql`
  query usersPostsQuery($username: String!) {
    getUsersPosts(username: $username) {
      id
      username
      creationDate
      images {
        url
        alt
      }
      content
      comments {
        id
        username
        content
      }
      likes {
        id
        username
      }
      likesCount
      commentsCount
    }
  }
`

// Create Post Mutation
const CREATE_POST_MUTATION = gql`
  mutation CreatePost($images: [ImageInput], $content: String!) {
    createPost(images: $images, content: $content) {
      id
      images {
        url
        alt
      }
      content
      username
      creationDate
      likesCount
      commentsCount
    }
  }
`
// Remove Post Mutation
const REMOVE_POST_MUTAION = gql`
  mutation RemovePost($postId: ID!) {
    removePost(postId: $postId)
  }
`

// Like Toggle Mutation
const LIKE_MUTATION = gql`
  mutation ToggleLike ($postId: ID!) {
    toggleLike(postId: $postId) {
      likesCount
    }
  }
`;

// Create Comment Mutation
const COMMENT_MUTATION = gql`
  mutation CreateComment($postId: ID!, $content: String!) {
    createComment(postId: $postId, content: $content) {
      comments {
        username
        content
      }
    }
  }
`

// Remove Comment Mutation
const REMOVE_COMMENT_MUTATION = gql`
  mutation RemoveComment($postId: ID!, $commentId: ID!) {
    removeComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        username
        content
      }
    }
  }
`

// Models
export interface Comment {
  id: string;
  username: string;
  content: string;
}

export interface ImageInput {
  url: string;
  alt: string;
}

export interface Image {
  id: string;
  url: string;
  alt: string;
}

export interface Post {
  id: string;
  username: string;
  creationDate: string;
  images: Image [];
  content: string;
  comments: Comment [];
  likes: any [];
  likesCount: number;
  commentsCount: number;
}

export interface PostResponse {
  getPosts: Post[];
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(
    private apollo: Apollo
  ) { }

  getPosts(): Observable<ApolloQueryResult<PostResponse>> {
    return this.apollo.watchQuery<PostResponse>({
      query: POST_QUERY
    })
    .valueChanges
  }

  getUsersPosts(username: String): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: USERS_POSTS_QUERY,
      variables: {
        username: username
      }
    })
    .valueChanges
  }

  createPost(images: ImageInput[], content: string): Observable<any> {
    return this.apollo.mutate({
      mutation: CREATE_POST_MUTATION,
      variables: {
        images,
        content
      }
    })
  }

  removePost(postID): Observable<any> {
    return this.apollo.mutate({
      mutation: REMOVE_POST_MUTAION,
      variables: {
        postId: postID
      }
    })
  }

  toggleLike(postID): Observable<any> {
    return this.apollo.mutate({
      mutation: LIKE_MUTATION,
      variables: {
        postId: postID
      }
    })
  }

  createComment(postID, comment): Observable<any> {
    return this.apollo.mutate({
      mutation: COMMENT_MUTATION,
      variables: {
        postId: postID,
        content: comment
      }
    })
  }

  removeComment(postID, commentID): Observable<any>  {
    return this.apollo.mutate({
      mutation: REMOVE_COMMENT_MUTATION,
      variables: {
        postId: postID,
        commentId: commentID
      }
    })
  }

}
