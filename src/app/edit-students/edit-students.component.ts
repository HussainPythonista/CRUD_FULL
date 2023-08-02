import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-edit-students',
  templateUrl: './edit-students.component.html',
  styleUrls: ['./edit-students.component.css']
})
export class EditStudentsComponent implements OnInit {
  studentForm: FormGroup;

  

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

  ngOnInit() {}
  edit:boolean=this.studentService.edit
  new_data_to_pass=this.studentService.data_to_pass
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
