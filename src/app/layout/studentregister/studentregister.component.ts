import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-studentregister',
  imports: [FormsModule,RouterLink],
  templateUrl: './studentregister.component.html',
  styleUrl: './studentregister.component.css'
})
export class StudentregisterComponent {

  name = '';
  email = '';
  password = '';

  constructor(private router: Router) {}

  register() {
    console.log('Student Registered:', this.name, this.email);
    this.router.navigate(['/login']);
  }
}
