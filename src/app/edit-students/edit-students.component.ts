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
        let update={name:this.studentForm.value.name,
        age:this.studentForm.value.age,
        roll_no:this.studentForm.value.roll_no,
        class:this.studentForm.value.class,
        class_teacher:this.studentForm.value.class_teacher,
        sec:this.studentForm.value.sec
      }
      this.studentService.updateStudent({ rollNo: update.roll_no, data: update }).subscribe(
        (response)=>{
        alert(response)},
        (error)=>{
          console.error(error)
        }
      )
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

    const formData = this.studentForm.value;
    this.studentService.check_present(formData.roll_no).subscribe(
      (response)=>{
        alert(response)

        }
        
    )
//     if (this.studentForm.valid) {
//       const formData = this.studentForm.value;

//       // Call the addStudent method from the service
//        this.studentService.addStudent(formData).subscribe(
//         (response) => {
//           alert(response)
//           // Optionally, you can perform any other actions or show a success message here
//         },
//         (error) => {
//           console.error('Error sending data:', error);
//           // Optionally, you can show an error message here
//         }
//       );
//   }

 
  
// }
}
}

