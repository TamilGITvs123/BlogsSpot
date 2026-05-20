import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';
  isRegister = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.error = '';
    if (this.isRegister) {
      this.auth.register(this.username, this.password).subscribe({ next: () => { this.isRegister = false; }, error: e => this.error = e.error || 'Register failed' });
    } else {
      this.auth.login(this.username, this.password).subscribe({ next: (res: any) => { this.auth.saveToken(res.token); this.router.navigateByUrl('/'); }, error: e => this.error = e.error || 'Login failed' });
    }
  }
}
