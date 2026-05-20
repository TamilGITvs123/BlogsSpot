import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';

@Component({ selector: 'app-blog-list', templateUrl: './blog-list.component.html' })
export class BlogListComponent implements OnInit {
  blogs: any[] = [];
  constructor(private blog: BlogService, private router: Router) {}
  ngOnInit(): void { this.load(); }
  load() { this.blog.list().subscribe((b: any) => this.blogs = b); }
  edit(id: number) { this.router.navigate(['/edit', id]); }
}
