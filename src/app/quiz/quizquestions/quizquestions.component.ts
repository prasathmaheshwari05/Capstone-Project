import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DbserviceService } from '../../services/dbservice.service'; 

@Component({
  selector: 'app-quizquestions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quizquestions.component.html',
  styleUrls: ['./quizquestions.component.css']
})
export class QuizquestionsComponent implements OnInit {

  quizName: string = '';
  timeLeft: number = 1800; // 30 minutes in seconds
  interval: any;
  questions: any[] = [];
  submitted: boolean = false;
  score: number = 0;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public dbService: DbserviceService
  ) {}

  ngOnInit() {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    if (!user.id) {
      alert('Please log in to take the quiz.');
      this.router.navigate(['/login']);
      return;
    }
  
    // Get the quiz name from the URL params
    this.quizName = this.route.snapshot.paramMap.get('quizName') || '';

    // Fetch quizzes from db.json
    this.dbService.getRecord('quizzes').subscribe((data: any) => {
      const quiz = data.find((q: any) => q.name === this.quizName);
      if (quiz) {
        this.questions = quiz.questions;
      } else {
        console.error('Quiz not found:', this.quizName);
        alert('Quiz not found');
      }
    });
  
    // Start the countdown timer
    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
        alert('Time is up! Submitting quiz.');
        this.submitQuiz();
      }
    }, 1000);
  }

  submitQuiz() {
    // Validate that all questions are answered
    if (this.questions.some(q => !q.selectedAnswer)) {
      alert('Please answer all questions before submitting.');
      return;
    }
    clearInterval(this.interval);

    // Calculate score based on correct answers
    this.score = this.questions.filter(q => q.selectedAnswer === q.correctAnswer).length;
    this.submitted = true;
    this.storeResult();
  }

  storeResult() {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    if (!user.id) return;
  
    const result = {
      userId: user.id,
      username: user.username,
      quizName: this.quizName,
      score: this.score,
      total: this.questions.length,
      submittedAt: new Date()
    };
  
    this.dbService.addRecord('results', result).subscribe((res: any) => {
      console.log('Result stored:', res);
    });
  }
}
