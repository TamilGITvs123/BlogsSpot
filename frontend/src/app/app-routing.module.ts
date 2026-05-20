import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogEditorComponent } from './components/blog-editor/blog-editor.component';

export const routes: Routes = [
  { path: '', component: BlogListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'edit', component: BlogEditorComponent },
  { path: 'edit/:id', component: BlogEditorComponent },
  { path: '**', redirectTo: '' }
];
