import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student.model';
import { StudentService } from '../service/student.service';
import { Router,NavigationExtras  } from '@angular/router';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  data_edit:any;
 
  edit:boolean=false

  constructor(private studentService: StudentService,private router: Router) { }

  ngOnInit(): void {
    this.fetchStudents();
    
  }
  list_delete:any=[]
  checked(roll_no:any){
    
    this.list_delete.push(roll_no)

    
  }

  delete_selected(list_delete:[]){
    console.log(list_delete)
  }
  // navigateToEditPageWithData() {
  //   const data = {
  //     age: 25,
  //     name: 'John Doe',
  //     subject: 'Mathematics'
  //   };
  
  //   const navigationExtras: NavigationExtras = {
  //     state: data
  //   };
  
  //   this.router.navigateByUrl('/edit', navigationExtras);
  // }

  student_edit(roll_no:any){
      //this.router.navigateByUrl("/edit")
      this.studentService.edit=true
      this.studentService.edit_roll_no=roll_no
      this.studentService.getOneStudent(roll_no).subscribe(
        (response)=>{
          this.data_edit=(response)
          this.studentService.stu_info_edit(this.data_edit)
          console.log(this.studentService.data_to_pass)
          this.router.navigateByUrl("/edit")
          
          
        },
        (error)=>{
          console.error(error)
        }
      )

  }

  add_student(){
      this.studentService.edit=false
      this.router.navigateByUrl("/add")
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
        this.fetchStudents()
      },
      (error)=>{
        alert("Error while get deleted")
      }
    )
  }
 
}
