import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DbserviceService } from '../../services/dbservice.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private dbService: DbserviceService, private router: Router) {}

  login() {
    this.dbService.getRecord('users').subscribe((users: any) => {
      const user = users.find((u: any) => u.username === this.username && u.password === this.password);
      if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        alert('Login successful!');
        this.router.navigate(['/studentdash']);
      } else {
        alert('Invalid credentials!');
      }
    });
  }
}
