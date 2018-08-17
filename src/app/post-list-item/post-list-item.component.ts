import { Component, Input } from '@angular/core';

import { PostService } from '../services/post.service';

import { Post } from '../models/post.model';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent {

  @Input() post: Post;

  constructor(private postService: PostService) { }

  isLoved(): boolean {
    return this.post.loveIts > 0;
  }

  isNotLoved(): boolean {
    return this.post.loveIts < 0;
  }

  onChangeLoveIts(value: number): void {
    this.postService.changeLoveIts(this.post, value);
  }

  onDelete(): void {
    this.postService.deletePost(this.post);
  }
}
