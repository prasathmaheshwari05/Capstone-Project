import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-studentnav',
  imports: [RouterLink],
  templateUrl: './studentnav.component.html',
  styleUrl: './studentnav.component.css'
})
export class StudentnavComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('userRole'); // Clear user role
    this.router.navigate(['/login']); // Redirect to login
  }

}
