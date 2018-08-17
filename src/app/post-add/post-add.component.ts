import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ValidateNotEmpty } from '../validators/notEmpty.validator'

import { PostService } from '../services/post.service';

import { Post } from '../models/post.model';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss']
})
export class PostAddComponent implements OnInit {

  title: string = 'Créer un post';
  postForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.postForm = this.formBuilder.group({
      title: ['', ValidateNotEmpty],
      content: ['', ValidateNotEmpty]
    });
  }

  onSubmitForm() {
    const formValue = this.postForm.value;
    this.postService.addPost({
      title: formValue.title.trim(),
      content: formValue.content.trim(),
    })
    this.router.navigate(['/posts']);
  }
}
