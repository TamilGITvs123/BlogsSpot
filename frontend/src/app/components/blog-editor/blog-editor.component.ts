import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';

@Component({ selector: 'app-blog-editor', templateUrl: './blog-editor.component.html' })
export class BlogEditorComponent implements OnInit {
  title = '';
  content = '';
  id: number | null = null;

  constructor(private route: ActivatedRoute, private blog: BlogService, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) { this.id = +id; this.blog.get(this.id).subscribe((b: any) => { this.title = b.title; this.content = b.content; }); }
  }

  save() {
    if (this.id) {
      this.blog.update(this.id, this.title, this.content).subscribe(() => this.router.navigateByUrl('/'));
    } else {
      this.blog.create(this.title, this.content).subscribe(() => this.router.navigateByUrl('/'));
    }
  }
}
