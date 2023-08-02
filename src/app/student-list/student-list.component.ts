import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student.model';
import { StudentService } from '../service/student.service';
import { single } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService,private router: Router) { }

  ngOnInit(): void {
    this.fetchStudents();
    
  }

  goToEditPage(roll_no:any) {
   this.router.navigateByUrl("/edit")
   roll_no=roll_no.toString()
   return this.studentService.getOneStudent(roll_no)
  }


  fetchOne(roll_no:any):void{
    console.log(roll_no)
  }

  fetchStudents(): void {
    this.studentService.getAllStudents().subscribe(
      (students: Student[]) => {
        this.students = students;
        console.log('Student List:', this.students);
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }
  deleted(roll_no:any):void{
    this.studentService.deleteOneStudent(roll_no).subscribe(
      (responce)=>{
        console.log(responce)
      },
      (error)=>{
        alert("Error while get deleted")
      }
    )
  }
 
}
