import { OnInit } from '@angular/core';

import firebase from 'firebase/app';
import 'firebase/database';
import { DataSnapshot } from 'firebase/database/DataSnapshot';

import { Subject } from 'rxjs/Subject';

import { Post } from '../models/post.model';

export class PostService {

  // change this line to begin a new Collection on firebase
  firebasePostsCollectionName = "posts";

  posts: Post[] = [];
  postsSubject = new Subject<Post[]>();

  constructor() {
    this.getPosts();
  }

  // firebase methods
  savePosts(): void {
    firebase.database().ref('/' + this.firebasePostsCollectionName).set(this.posts);
  }

  getPosts(): void {
    firebase.database().ref('/' + this.firebasePostsCollectionName)
     .on('value', (data: DataSnapshot) => {
         this.posts = data.val() ? data.val() : [];
         this.emitPostsSubject();
       }
     );
  }

  // postService methods
  emitPostsSubject(): void {
    this.postsSubject.next(this.posts.slice());
  }

  addPost(newPost: any): void {
    this.posts.push(new Post(newPost.title, newPost.content));
    this.savePosts();
    this.emitPostsSubject();
  }

  findPostIndex(post: Post): number {
    return this.posts.findIndex(
      postEl => postEl === post
    );
  }

  deletePost(post: Post): void {
    const index = this.findPostIndex(post);
    if (index === -1) {
      console.log('Bad index for delete.')
      return ;
    }
    this.posts.splice(index, 1);
    this.savePosts();
    this.emitPostsSubject();
  }

  changeLoveIts(post: Post, value: number): void {
    const index = this.findPostIndex(post);
    if (index === -1) {
      console.log('Bad index for changeLoveIts.')
      return ;
    }
    this.posts[index].loveIts += value;
    this.savePosts();
    this.emitPostsSubject();
  }
}
