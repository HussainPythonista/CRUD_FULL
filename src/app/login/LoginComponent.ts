import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../service/student.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string | undefined;
  password: string | undefined;


  constructor(private router: Router, private studentService: StudentService) {
  }


  onSubmit() {
    if (this.username === 'admin' && this.password === 'admin') {
      // Replace the following line with the logic you want to execute on successful login.
      this.studentService.logged = true;
      this.router.navigate(["/info"]);
      console.log(this.studentService.logged);
    } else {
      // Replace the following line with the logic you want to execute on failed login.
      console.log('Login failed. Invalid username or password.');
    }
  }

}
