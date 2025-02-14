import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DbserviceService } from '../../services/dbservice.service';

@Component({
  selector: 'app-admindash',
  standalone: true, // ✅ Ensure it's standalone
  imports: [FormsModule, CommonModule],
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.css']
})
export class AdmindashComponent implements OnInit {
  quizzes: any[] = [];
  selectedQuiz: any = null;

  // Form fields
  newQuiz = { name: '', questions: [] ,completeTime: ''};
  newQuestion = { question: '', options: ['', '', '', ''], correctAnswer: '', difficulty: 'easy' };

  constructor(private dbService: DbserviceService) {}

  ngOnInit() {
    this.loadQuizzes();
  }

  // Fetch all quizzes from db.json
  loadQuizzes() {
    this.dbService.getRecord('quizzes').subscribe((data: any) => {
      this.quizzes = data;
    });
  }
  addQuiz() {
    if (!this.newQuiz.name.trim()) {
      alert('Quiz name cannot be empty.');
      return;
    }

    if (!this.newQuiz.completeTime) {
      alert('Please select a completion deadline.');
      return;
    }

    // Get the next available ID
    const nextId = this.quizzes.length > 0 ? (Math.max(...this.quizzes.map(q => parseInt(q.id))) + 1).toString() : '1';

    const newQuizData = {
      ...this.newQuiz,
      id: nextId,
      postedDate: new Date().toISOString(), // ✅ Store current timestamp
    };

    this.dbService.addRecord('quizzes', newQuizData).subscribe(() => {
      alert('Quiz added successfully!');
      this.newQuiz = { name: '', completeTime: '', questions: [] }; // Reset form
      this.loadQuizzes();
    });
  }

  // Add a new quiz
 

  // Delete a quiz
  deleteQuiz(quizId: string) {
    if (confirm('Are you sure you want to delete this quiz?')) {
      this.dbService.deleteRecord('quizzes', quizId).subscribe(() => {
        alert('Quiz deleted successfully!');
        this.loadQuizzes();  // Refresh the quizzes list
      });
    }
  }

  // Select a quiz to add or edit questions
  selectQuiz(quiz: any) {
    this.selectedQuiz = JSON.parse(JSON.stringify(quiz)); // Deep copy to prevent direct mutation
    this.newQuestion = { question: '', options: ['', '', '', ''], correctAnswer: '', difficulty: 'easy' };
  }

  // Add a question to the selected quiz
  addQuestionToQuiz() {
    if (!this.selectedQuiz) {
      alert('Please select a quiz first.');
      return;
    }
    if (!this.newQuestion.question.trim() || this.newQuestion.options.some(opt => !opt.trim()) || !this.newQuestion.correctAnswer.trim()) {
      alert('Please fill in all fields correctly.');
      return;
    }

    // Add the new question to the quiz
    this.selectedQuiz.questions.push({ ...this.newQuestion });

    this.dbService.updateRecord('quizzes', this.selectedQuiz.id, this.selectedQuiz).subscribe(() => {
      alert('Question added successfully!');
      this.newQuestion = { question: '', options: ['', '', '', ''], correctAnswer: '', difficulty: 'easy' };  // Reset form
      this.loadQuizzes();  // Refresh the quizzes list
    });
  }

  // Edit an existing question
  editQuestion(index: number) {
    const editedQuestion = prompt('Edit Question:', this.selectedQuiz.questions[index].question);
    if (editedQuestion) {
      this.selectedQuiz.questions[index].question = editedQuestion;

      // ✅ Edit Difficulty Level
      const editedDifficulty = prompt('Edit Difficulty (easy, medium, hard):', this.selectedQuiz.questions[index].difficulty);
      if (editedDifficulty && ['easy', 'medium', 'hard'].includes(editedDifficulty.toLowerCase())) {
        this.selectedQuiz.questions[index].difficulty = editedDifficulty.toLowerCase();
      }

      this.dbService.updateRecord('quizzes', this.selectedQuiz.id, this.selectedQuiz).subscribe(() => {
        alert('Question updated successfully!');
        this.loadQuizzes();  // Refresh the quizzes list
      });
    }
  }

  // Delete a question from the selected quiz
  deleteQuestion(index: number) {
    if (confirm('Are you sure you want to delete this question?')) {
      this.selectedQuiz.questions.splice(index, 1);  // Remove question from the quiz
      this.dbService.updateRecord('quizzes', this.selectedQuiz.id, this.selectedQuiz).subscribe(() => {
        alert('Question deleted successfully!');
        this.loadQuizzes();  // Refresh the quizzes list
      });
    }
  }
}
