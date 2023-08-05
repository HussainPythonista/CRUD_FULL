import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-edit-students',
  templateUrl: './edit-students.component.html',
  styleUrls: ['./edit-students.component.css']
})
export class EditStudentsComponent implements OnInit {
  studentForm: FormGroup;
  age:number | undefined;
  
  @Input() roll_number:number|undefined;
  constructor(private formBuilder: FormBuilder,private studentService:StudentService) {
    this.studentForm = this.formBuilder.group({
      roll_no: ['', Validators.required],
      name: ['', Validators.required],
      age: ['', Validators.required],
      class: ['', Validators.required],
      section: ['', Validators.required],
      class_teacher: ['', Validators.required]
    });
  }

  roll_no_edit=this.studentService.edit_roll_no

  ngOnInit() {
    if (this.roll_number) {
      // If `roll_number` input is provided, enable edit mode and load data
      this.studentService.edit = true;
      this.loadStudentData();
    }
  }

  loadStudentData() {
    this.studentService.getOneStudent(this.studentService.edit_roll_no).subscribe(
      (response:any)=>{
        alert(this.studentForm.value.name)
        alert(this.studentForm.value.age)
        alert(this.studentForm.value.roll_no)
        alert(this.studentForm.value.class)
        alert(this.studentForm.value.class_teacher)
      }
    )
  }

  edit:boolean=this.studentService.edit
  new_data_to_pass=this.studentService.data_to_pass

  onEdit() {
    
    //alert(this.studentForm.)
    }
    
  inputVal(){
    console.log(this.age)
  }
  onSubmit() {

    if (this.studentForm.valid) {
      const formData = this.studentForm.value;

      // Call the addStudent method from the service
       this.studentService.addStudent(formData).subscribe(
        (response) => {
          alert(response)
          // Optionally, you can perform any other actions or show a success message here
        },
        (error) => {
          console.error('Error sending data:', error);
          // Optionally, you can show an error message here
        }
      );
  }

 
  
}
}


