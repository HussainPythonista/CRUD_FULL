import { Component,OnInit,ChangeDetectorRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../service/student.service';
import {Student} from '../models/student.model'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  edit_student_info=false
  studentForm: FormGroup;
  addStudentForm: FormGroup;
  student_details=[
      {
        "roll_no": 101,
        "name": "Sarah Johnson",
        "age": 16,
        "class_teacher": "Mr. Anderson",
        "class": 10,
        "section": "A"
      },
      {
        "roll_no": 102,
        "name": "Alex Ramirez",
        "age": 15,
        "class_teacher": "Ms. Parker",
        "class": 9,
        "section": "B"
      },
      {
        "roll_no": 103,
        "name": "Emily Patel",
        "age": 14,
        "class_teacher": "Mrs. Thompson",
        "class": 8,
        "section": "C"
      },
      {
        "roll_no": 104,
        "name": "Jackson Lee",
        "age": 17,
        "class_teacher": "Mr. Martinez",
        "class": 11,
        "section": "A"
      },
      {
        "roll_no": 105,
        "name": "Olivia Martin",
        "age": 13,
        "class_teacher": "Ms. White",
        "class": 7,
        "section": "D"
      },
      {
        "roll_no": 106,
        "name": "Ethan Smith",
        "age": 15,
        "class_teacher": "Mr. Johnson",
        "class": 9,
        "section": "C"
      },
      {
        "roll_no": 107,
        "name": "Ava Williams",
        "age": 12,
        "class_teacher": "Mrs. Davis",
        "class": 6,
        "section": "B"
      },
      {
        "roll_no": 108,
        "name": "Liam Brown",
        "age": 16,
        "class_teacher": "Mr. Thompson",
        "class": 10,
        "section": "B"
      },
      {
        "roll_no": 109,
        "name": "Mia Wilson",
        "age": 14,
        "class_teacher": "Ms. Hernandez",
        "class": 8,
        "section": "A"
      },
      {
        "roll_no": 110,
        "name": "Noah Taylor",
        "age": 17,
        "class_teacher": "Mr. Rodriguez",
        "class": 11,
        "section": "C"
      }
    ]
    //student_details:Student[]=[]
    constructor(private formBuilder: FormBuilder,private studentService:StudentService,private changeDetector: ChangeDetectorRef){
      this.studentForm = this.formBuilder.group({
        roll_no: ['', Validators.required],
        name: ['', Validators.required],
        age: ['', Validators.required],
        class: ['', Validators.required],
        section: ['', Validators.required],
        class_teacher: ['', Validators.required]
      });
        
      this.addStudentForm = this.formBuilder.group({
        roll_no: ['',Validators.required],
        name: ['',Validators.required],
        class: ['',Validators.required],
        section: ['',Validators.required],
        class_teacher: ['',Validators.required],
        age: ['',Validators.required]
      });
  
  
      
    
    }
    ngOnInit(){
      
      this.get_student()
    }
    add_student:boolean=false
    edit_student_roll: number |null=null;

    info_pass_template:any;

    edit_info(roll_no:number){
      if (this.add_student==false){
        console.log(roll_no)

        this.edit_student_info=true
        console.log(this.edit_student_info)
        this.info_pass_template=this.student_details.find((student)=>student.roll_no==roll_no)
        this.edit_student_roll=roll_no
      }
      else{
        this.cancel_add()
        this.edit_info(roll_no)
      }
      

    }
    delete_info(roll_no:number){
      //this.student_details.slice(this.student_details.find((response)=>response.roll_no==roll_no),-1)
      this.studentService.deleteOneStudent(roll_no).subscribe(
        (response)=>{
          console.log(response)
          this.get_student()
        }
      )
    }

    add_student_info(){
      this.resetForm()
      if (this.edit_student_info==false){
        this.add_student=!this.add_student
      }
      
      else{
        
        this.cancel_edit()
        this.add_student_info()
      }
      
      
    }
    
    
    get_student(){
      this.studentService.getAllStudents().subscribe(
        (data:Student[])=>{
          this.student_details=data
        }
      )
    }

  submitForm() {
      if (this.edit_student_info==true){
        if (this.studentForm.valid) {
          const formData = this.studentForm.value ;
          // console.log(formData);
          console.log(formData)
          this.studentService.addStudent(formData).subscribe(
            (response)=>{
              this.get_student()
              this.resetForm()
              console.log(response)})
        
            }
      }
      else{
        if (this.addStudentForm.valid){
          const formData = this.addStudentForm.value ;
          this.studentService.addStudent(formData).subscribe(
            (response)=>{
              this.add_student1()
              this.changeDetector.detectChanges()
              this.resetForm()
              this.get_student()})
        }
      }
  
  }
  cancel_add(){
    console.log("add cancel")
    return this.add_student=false
    
  }
    cancel_edit(){
      

      this.edit_student_roll = null;
      this.edit_student_info = false;
      console.log("edit cancel")
      
      
    }
    resetForm() {
        this.studentForm.reset();
        this.addStudentForm.reset();
        
      }
    list_delete:any=[]
    isClicked:boolean=false
    isDeleteDisabled: boolean = false;

    // Update this property whenever selectedItems change
    updateDeleteButtonStatus() {
      console.log("update")
    }

    checked(roll_no:any){
      this.updateDeleteButtonStatus()
      if (this.list_delete.includes(roll_no)){
        //this.list_delete.push(roll_no)
        const index = this.list_delete.indexOf(roll_no);
        this.list_delete.splice(index, 1);
      }
      else{
        this.list_delete.push(roll_no)
        //console.log(this.list_delete)
      }
      //console.log(this.list_delete)
    }
    response_message:string|undefined;
    delete_selected(list_delete:[]): void{
      this.studentService.deleteListStudents(list_delete).subscribe(
        (response)=>{
          this.get_student()
          console.log(response)
          
        },
        (error)=>{
          console.error(error)
        }
      )
    
    }
    add_student1(){
      const addedStudent = this.student_details.find(student => student.roll_no === this.edit_student_roll);
      console.log(addedStudent)
      this.add_student=false
    }
    save_edit(){
          console.log("save_edit",this.studentForm.value)
          
          // const patch_value={name:this.addStudentForm.value.name,
          // roll_no:this.addStudentForm.value.roll_no,
          // section:this.addStudentForm.value.section,
          // class_teacher:this.addStudentForm.value.class_teacher,
          // age:this.addStudentForm.value.age,
          // class:this.addStudentForm.value.class}
          this.edit_student_info = false; // Exit editing mode
          this.edit_student_roll = null;  // Clear the flag
          // this.changeDetector.detectChanges()
          // this.get_student()
         
        }
        showDelete = false;

        showDeleteOption() {
          this.showDelete = true;
        }
      
        hideDeleteOption() {
          this.showDelete = false;
        }
        deleteall(){
          
        }
        sortde:Student[]=[]
        
        
        sortData(col_Name:any,type:any){
          console.log(col_Name,type)
          
          if (col_Name=="roll_no"){
            if (type==true){
                this.student_details=this.student_details.sort((a,b)=>b.roll_no-a.roll_no)
                console.log("roll_no is clicked",type)
            }
            else if (type==false){
                    this.student_details=this.student_details.sort((a,b)=>a.roll_no-b.roll_no)
                    console.log("roll_no is clicked",type)
                  }
          }
          if (col_Name=='name'){
            if (type==true){
              this.student_details=this.student_details.sort((a,b)=>b.name.localeCompare(a.name))
              console.log("name is clicked",type)
            }
            else if (type==false){
              this.student_details=this.student_details.sort((a,b)=>a.name.localeCompare(b.name))
              console.log("name is clicked",type)
            }
            }
            if (col_Name=='class'){
              if (type==true){
                this.student_details=this.student_details.sort((a,b)=>b.class-a.class)
                console.log("class is clicked",type)
              }
              else if (type==false){
                this.student_details=this.student_details.sort((a,b)=>a.class-b.class)
                console.log("class is clicked",type)
              }
              }
              if (col_Name=='section'){
                if (type==true){
                  this.student_details=this.student_details.sort((a,b)=>b.section.localeCompare(a.section))
                  console.log("section is clicked",type)
                }
                else if (type==false){
                  this.student_details=this.student_details.sort((a,b)=>a.section.localeCompare(b.section))
                  console.log("section is clicked",type)
                }
                }
                if (col_Name=='class_teacher'){
                  if (type==true){
                    this.student_details=this.student_details.sort((a,b)=>b.class_teacher.localeCompare(a.class_teacher))
                    console.log("section is clicked",type)
                  }
                  else if (type==false){
                    this.student_details=this.student_details.sort((a,b)=>a.class_teacher.localeCompare(b.class_teacher))
                    console.log("section is clicked",type)
                  }
                  }
                  if (col_Name=='age'){
                    if (type==true){
                      this.student_details=this.student_details.sort((a,b)=>b.age-(a.age))
                      console.log("section is clicked",type)
                    }
                    else if (type==false){
                      this.student_details=this.student_details.sort((a,b)=>a.age-(b.age))
                      console.log("section is clicked",type)
                    }
                    }
  
        }
        descending=false
        sort_clicked(col_Name:string){
          this.descending=!this.descending
          console.log(this.descending)
          this.sortData(col_Name,this.descending)
        }
        search=false
        searchText: string = '';

        searchStudents(){
          this.search=true
          console.log(this.searchText)
          console.log(this.search)
        }
        clearSearch(){
          
        }
}
