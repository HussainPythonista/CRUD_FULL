import { Component,OnInit,ChangeDetectorRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from './src/app/service/student.service';
import {Student} from './src/app/models/student.model'


@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit {
  edit_student_info=false
  studentForm: FormGroup;
  addStudentForm: FormGroup;
  add_student:boolean=false
  edit_student_roll: number |null=null;
  isDeleteDisabled: boolean = false;
  info_pass_template:any;
    // student_details=[
    //   {
    //     "roll_no": 101,
    //     "name": "Sarah Johnson",
    //     "age": 16,
    //     "class_teacher": "Mr. Anderson",
    //     "class": 10,
    //     "section": "A"
    //   },
    //   {
    //     "roll_no": 102,
    //     "name": "Alex Ramirez",
    //     "age": 15,
    //     "class_teacher": "Ms. Parker",
    //     "class": 9,
    //     "section": "B"
    //   },
    //   {
    //     "roll_no": 103,
    //     "name": "Emily Patel",
    //     "age": 14,
    //     "class_teacher": "Mrs. Thompson",
    //     "class": 8,
    //     "section": "C"
    //   },
    //   {
    //     "roll_no": 104,
    //     "name": "Jackson Lee",
    //     "age": 17,
    //     "class_teacher": "Mr. Martinez",
    //     "class": 11,
    //     "section": "A"
    //   },
    //   {
    //     "roll_no": 105,
    //     "name": "Olivia Martin",
    //     "age": 13,
    //     "class_teacher": "Ms. White",
    //     "class": 7,
    //     "section": "D"
    //   },
    //   {
    //     "roll_no": 106,
    //     "name": "Ethan Smith",
    //     "age": 15,
    //     "class_teacher": "Mr. Johnson",
    //     "class": 9,
    //     "section": "C"
    //   },
    //   {
    //     "roll_no": 107,
    //     "name": "Ava Williams",
    //     "age": 12,
    //     "class_teacher": "Mrs. Davis",
    //     "class": 6,
    //     "section": "B"
    //   },
    //   {
    //     "roll_no": 108,
    //     "name": "Liam Brown",
    //     "age": 16,
    //     "class_teacher": "Mr. Thompson",
    //     "class": 10,
    //     "section": "B"
    //   },
    //   {
    //     "roll_no": 109,
    //     "name": "Mia Wilson",
    //     "age": 14,
    //     "class_teacher": "Ms. Hernandez",
    //     "class": 8,
    //     "section": "A"
    //   },
    //   {
    //     "roll_no": 110,
    //     "name": "Noah Taylor",
    //     "age": 17,
    //     "class_teacher": "Mr. Rodriguez",
    //     "class": 11,
    //     "section": "C"
    //   }
    // ]
    student_details:Student[]=[]
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
    filteredData: any = [];
    search_input=false
    searchText: string = '';
    handleSearchInput() {
    
    
      this.filteredData = this.student_details.filter(item =>
        item.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
      
      console.log(this.student_details,"Student details")
      console.log(this.filteredData,"Filterd")
    }
    handleKeyDown(event: KeyboardEvent) {
    
      this.search_input=true
    }
    edit_info(roll_no:number){
      console.log(roll_no)

      this.edit_student_info=true
      console.log(this.edit_student_info)
      this.info_pass_template=this.student_details.find((student)=>student.roll_no==roll_no)
      this.edit_student_roll=roll_no

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
      console.log("Student Add")
      this.add_student=!this.add_student
      this.resetForm()
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
    cancel(){
      

      this.edit_student_roll = null;
      this.edit_student_info = false;
      this.add_student=false
      
    }
    resetForm() {
        this.studentForm.reset();
        this.addStudentForm.reset();
        
      }
    list_delete:any=[]
    isClicked:boolean=false
    checked(roll_no:any){
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
      // deleteall(){
      //   console.log("Delete all selected")
      // }

      cancel_edit(){
    

        this.edit_student_roll = null;
        this.edit_student_info = false;
        console.log("edit cancel")
        
        
      }
      cancel_add(){
        console.log("add cancel")
        return this.add_student=false
        
      }
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
      isSelected=false
      uncheck(){
        this.list_delete=[]
      }
  
      check(){
        this.student_details.forEach((value)=>{
          this.list_delete.push(value.roll_no)
        })
      }
      deleteall(event:any){
        this.isSelected=!this.isSelected
        console.log(this.isSelected)
        if (this.isSelected==true){
          this.check()
        }
        else{
          this.uncheck()
        }
        console.log(this.list_delete)
      }
}




<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Information</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

</head>

<body>
    <header >
        <div class="center">
            <div class="header ">
                <h2 class="header-info">Student Information</h2>
            
            </div>
        </div>
        <div class="search-bar">
            
            <div class="combined-add_trash">
                <div class="add_button">
                    <button id="add-left" class="btn" (click)="add_student_info()">
                <img src="assets/176-1760952_add-user-symbol-comments-add-user-icon-png.png" title="Add new student" width="20">
                </button>
                <button  [disabled]="isDeleteDisabled==true" id="delete-selected" 
                    class="btn delete-btn" 
                    *ngIf="student_details.length>1 && list_delete.length>0 " (click)="delete_selected(list_delete)">
                    <img src="assets/3221803.png" title="Delete Selected" width="20">
                </button>
                </div>
            </div>
            <div class="search-right">
            
              <input
                type="text" (ngModelChange)="handleSearchInput()" 
                [(ngModel)]="searchText" (keydown)="handleKeyDown($event)"
                placeholder="Search by Roll No or Name"
                id="input-box"
                class="custom-input round-input" >
              <button type= "button" class="btn round-button" >
                <img src="assets/search.png"  width="20" alt="Search" title="Search">
              </button>
            </div>
          </div>
    </header>
    
    
    <ng-container *ngIf="add_student" >
        <form [formGroup]="addStudentForm" (submit)="submitForm()">
                
    </form>
    </ng-container>
    
    <form [formGroup]="studentForm" (submit)="submitForm()">
        <table class="data-table">
            <tr>
                <th [ngStyle]="{'color':'white',
                'font-family': 'Courier New',
                'font-size': '15px'}"><input type="checkbox" class="custom-checkbox"
                (change)="deleteall($event)" >  </th>
               
                <th class="table-col">
                    <button class="sort-button" (click)="sort_clicked('roll_no')">
                        <img src="assets/reorder.png"  width="18"></button>
                    <!--button class="sort-button" (click)="sortData('roll_no','dec')">▼</button-->Roll No</th>
                
                <th class="table-col"> 
                    <button class="sort-button"  (click)="sort_clicked('name')">
                    <img src="assets/reorder.png"  width="18"></button>
                    <!--button class="up-down" (click)="sortData('name','dec')">▼</button-->Name</th>
                
                
                <th class="table-col"> <button class="sort-button"  (click)="sort_clicked('class')">
                    <img src="assets/reorder.png"  width="18"></button>
                    <!--button class="up-down" (click)="sortData('class','dec')">▼</button-->Class</th>
                
                
                <th class="table-col"> <button class="sort-button"  (click)="sort_clicked('section')">
                    <img src="assets/reorder.png"  width="18"></button>
                    <!--button class="sort-button" (click)="sortData('section','dec')">
                        <img src="assets/down-filled-triangular-arrow.png"  width="10"></button-->Section</th>
                
                
                <th class="table-col"> <button class="sort-button" (click)="sort_clicked('class_teacher')">
                    <img src="assets/reorder.png"  width="18"></button>
                    <!--button class="up-down" (click)="sortData('class_teacher','dec')">▼</button-->Class Teacher</th>
                
                
                <th class="table-col"> 
                    <button class="sort-button"  (click)="sort_clicked('age')">
                        <img src="assets/reorder.png"  width="18"></button>
                    <!--button class="up-down" (click)="sortData('age','dec')">▼</button-->Age</th>
                
            
                <th class="table-col"> Actions</th>
        </tr>
        <ng-container *ngIf="add_student" >
            <td>New Info:</td>
            <td><input placeholder="Roll No" type="number"  formControlName="roll_no" name="roll_no" required></td>
            <td><input placeholder="Name" type="text" formControlName="name"></td>
            <td><input placeholder="class" type="text" formControlName="class"></td>
            <td><input placeholder="Section" type="text" formControlName="section"></td>
            <td><input placeholder="Class teacher" type="text" formControlName="class_teacher"></td>
            <td><input type="text" placeholder="Age" formControlName="age"></td>
            <td>
                <div class="button-container">
                    <button class="btn center-button"  (click)="save_edit()">
                        <img src="assets\8666542_save_icon.png" alt="Edit Icon" width="20" height="20"></button>
                    <button class="btn center-button"  (click)="cancel_add()">
                        <img  src="assets\4781838_cancel_close_delete_exit_logout_icon.png" alt="Edit Icon" width="20" height="20">
                    </button>
                
                </div>
            
        </ng-container>
        
        <tr *ngFor="let info of (search_input ? filteredData : student_details); let i = index" class="student-row">
                <ng-container *ngIf="edit_student_roll == info.roll_no; else viewRow">
                        <td ></td>
                        <td><input type="number" formControlName="roll_no" [ngModel]="info_pass_template.roll_no"></td>
                        <td><input type="text" formControlName="name" [ngModel]="info_pass_template.name" ></td>
                        <td><input type="text" formControlName="class" [ngModel]="info_pass_template.class"></td>
                        <td><input type="text" formControlName="section" [ngModel]="info_pass_template.section"></td>
                        <td><input type="text" formControlName="class_teacher" [ngModel]="info_pass_template.class_teacher"></td>
                        <td><input type="text" formControlName="age" [ngModel]="info_pass_template.age"></td>

                        <td>
                            <div class="button-container">
                                <button class="btn center-button" (click)="save_edit()">
                                    <img src="assets\8666542_save_icon.png" alt="Edit Icon" width="20" height="20"></button>
                                <button class="btn center-button"  (click)="cancel_edit()">
                                    <img  src="assets\4781838_cancel_close_delete_exit_logout_icon.png" alt="Edit Icon" width="20" height="20">
                                </button>
                            
                            </div>
                        </td>
                </ng-container>
                <ng-template #viewRow>
                    
                    <td class="empty-td"><input class="custom-checkbox" [checked]="isSelected"  type="checkbox" (click)="checked(info.roll_no)"></td>
                    <td class="student-row">{{info.roll_no }} </td>
                    <td class="student-row">{{ info.name }}</td>
                    <td class="student-row">{{ info.class }}</td>
                    <td class="student-row">{{ info.section }}</td>
                    <td class="student-row">{{ info.class_teacher }}</td>
                    <td class="student-row">{{ info.age }}</td>
                    
                    <td>
                        <button class="btn center-button"   (click)="edit_info(info.roll_no)">
                            <img src="assets/8542056_edit_write_icon.png" alt="Edit Icon" title="Edit Info" width="20" height="20">
                        </button>   
                        <button  class="btn center-button" (click)="delete_info(info.roll_no)">
                            <img src="assets/3669361_delete_ic_icon.png" alt="Edit Icon" width="20" height="20"
                            title="Delete Info"></button>
                    </td>
                </ng-template>
            </tr>
            
            <tr>
                
            </tr>
        </table>
        
    </form>
</body>
</html>
