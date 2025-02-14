import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DbserviceService } from '../../services/dbservice.service';

@Component({
  selector: 'app-studentscores',
  imports: [CommonModule],
  templateUrl: './studentscores.component.html',
  styleUrl: './studentscores.component.css'
})
export class StudentscoresComponent implements OnInit {
  studentScores: any[] = [];

  constructor(private dbService: DbserviceService) {}

  ngOnInit() {
    this.dbService.getRecord('results').subscribe((data: any) => {
      // Sort results by submission time (latest first)
      this.studentScores = data.sort((a: any, b: any) => 
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      );
    });
  }
}
