import { Component } from '@angular/core';
import { AuthService } from './auth.service'; // Update the path to the AuthService
import { StudentService } from './service/student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( private studentService:StudentService){


  }
  logged = false;

  onLoginSuccess(event: any) {
    // You can perform any additional actions here if needed
    // For now, we'll just update the 'logged' variable
    this.logged = true;
  }
}