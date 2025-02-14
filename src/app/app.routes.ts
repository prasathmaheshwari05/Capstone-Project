import { Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { StudentregisterComponent } from './layout/studentregister/studentregister.component';
import { AdminregisterComponent } from './layout/adminregister/adminregister.component';

import { StudentdashComponent } from './student/studentdash/studentdash.component';
import { StudentprofileComponent } from './student/studentprofile/studentprofile.component';
import { StudentscoresComponent } from './student/studentscores/studentscores.component';


import { AdmincreatequizComponent } from './admin/admincreatequiz/admincreatequiz.component';
import { AdmineditquizComponent } from './admin/admineditquiz/admineditquiz.component';
import { AdminProfileComponent,  } from './admin/adminprofile/adminprofile.component';
import { AdminviewscoreComponent } from './admin/adminviewscore/adminviewscore.component';

import { AdminnavComponent } from './layout/adminnav/adminnav.component';
import { StudentnavComponent } from './layout/studentnav/studentnav.component';
import { AdminmainComponent } from './layout/adminmain/adminmain.component';
import { StudentmainComponent } from './layout/studentmain/studentmain.component';
import { QuizquestionsComponent } from './quiz/quizquestions/quizquestions.component';
import { AdmindashComponent } from './admin/admindash/admindash.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // ✅ Authentication Routes
  { path: 'login', component: LoginComponent },
  { path: 'studentregister', component: StudentregisterComponent },
  { path: 'adminregister', component: AdminregisterComponent },
  { path: 'admin-nav', component: AdminnavComponent },
  { path: 'student-nav', component: StudentnavComponent },
  { path: 'quiz/:quizName', component: QuizquestionsComponent },
 

  // ✅ Student Routes
  { path: 'studentdash', component: StudentdashComponent },
  { path: 'student/profile', component: StudentprofileComponent },
  { path: 'studentscore', component: StudentscoresComponent },

  // ✅ Admin Routes
  { path: 'admindash', component: AdmindashComponent },
//   { path: 'admin/create-quiz', component: AdmincreatequizComponent },
//   { path: 'admin/edit-quiz/:id', component: AdmineditquizComponent },
  { path: 'admin/profile', component: AdminProfileComponent },
  { path: 'admin/view-score', component: AdminviewscoreComponent },

//   { 
//     path: 'admin', component: AdminmainComponent, 
//     children: [
//       { path: 'dashboard', loadComponent: () => import('./admin/admindash/admindash.component').then(m => m.AdmindashComponent) }
//     ]
//   },
  
//   { 
//     path: 'student', component: StudentmainComponent, 
//     children: [
//       { path: 'dashboard', loadComponent: () => import('./student/studentdash/studentdash.component').then(m => m.StudentdashComponent) }
//     ]
//   },

  // ✅ Fallback Route
  { path: '**', redirectTo: 'login' }
];
