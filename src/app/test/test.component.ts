import { Component,OnInit,Input,ChangeDetectorRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../service/student.service';
import {Student} from '../models/student.model'
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  @Input() student_details_input: any[] = [];
  searchControl: FormControl = new FormControl('');
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
      },
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
        "name": "John Smith",
        "age": 15,
        "class_teacher": "Mrs. Williams",
        "class": 9,
        "section": "B"
      },
      {
        "roll_no": 103,
        "name": "Emily Brown",
        "age": 17,
        "class_teacher": "Mr. Davis",
        "class": 11,
        "section": "A"
      },
      {
        "roll_no": 104,
        "name": "Michael Miller",
        "age": 14,
        "class_teacher": "Miss Wilson",
        "class": 8,
        "section": "C"
      },
      {
        "roll_no": 105,
        "name": "Sophia Martinez",
        "age": 15,
        "class_teacher": "Mr. Thompson",
        "class": 10,
        "section": "B"
      },
      {
        "roll_no": 106,
        "name": "Ethan Harris",
        "age": 16,
        "class_teacher": "Mrs. Martin",
        "class": 11,
        "section": "C"
      },
      {
        "roll_no": 107,
        "name": "Olivia Taylor",
        "age": 14,
        "class_teacher": "Mr. Jackson",
        "class": 9,
        "section": "A"
      },
      {
        "roll_no": 108,
        "name": "Ava Anderson",
        "age": 15,
        "class_teacher": "Miss Garcia",
        "class": 10,
        "section": "B"
      },
      {
        "roll_no": 109,
        "name": "William Wilson",
        "age": 16,
        "class_teacher": "Mrs. Lee",
        "class": 11,
        "section": "C"
      },
      {
        "roll_no": 110,
        "name": "Liam Hernandez",
        "age": 15,
        "class_teacher": "Mr. Robinson",
        "class": 10,
        "section": "A"
      },
      {
        "roll_no": 111,
        "name": "Emma Davis",
        "age": 16,
        "class_teacher": "Mrs. Moore",
        "class": 11,
        "section": "B"
      },
      {
        "roll_no": 112,
        "name": "Noah Thompson",
        "age": 14,
        "class_teacher": "Mr. White",
        "class": 9,
        "section": "C"
      },
      {
        "roll_no": 113,
        "name": "Isabella Adams",
        "age": 15,
        "class_teacher": "Miss Hall",
        "class": 10,
        "section": "A"
      },
      {
        "roll_no": 114,
        "name": "Mason Brown",
        "age": 16,
        "class_teacher": "Mr. Johnson",
        "class": 11,
        "section": "B"
      },
      {
        "roll_no": 115,
        "name": "Oliver Martinez",
        "age": 14,
        "class_teacher": "Mrs. Thomas",
        "class": 9,
        "section": "C"
      },
      {
        "roll_no": 116,
        "name": "Sophie Wilson",
        "age": 15,
        "class_teacher": "Miss Jackson",
        "class": 10,
        "section": "A"
      },
      {
        "roll_no": 117,
        "name": "Lucas Garcia",
        "age": 16,
        "class_teacher": "Mr. Anderson",
        "class": 11,
        "section": "B"
      },
      {
        "roll_no": 118,
        "name": "Amelia Lee",
        "age": 14,
        "class_teacher": "Mrs. Davis",
        "class": 9,
        "section": "C"
      },
      {
        "roll_no": 119,
        "name": "Jackson Moore",
        "age": 15,
        "class_teacher": "Mr. Robinson",
        "class": 10,
        "section": "A"
      },
      {
        "roll_no": 120,
        "name": "Lily Hall",
        "age": 16,
        "class_teacher": "Miss Williams",
        "class": 11,
        "section": "B"
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
    
    filteredStudentDetails:Student[] = []
    ngOnInit(){
      
      this.get_student()
      
    }
    filterStudentDetails(searchText: string) {
      searchText = searchText.toLowerCase();
      this.filteredStudentDetails = this.student_details.filter(
        student => 
          student.roll_no.toString().includes(searchText) ||
          student.name.toLowerCase().includes(searchText)
      );
      
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
        console.log("save_edit!!!",this.studentForm.value)
        if (this.studentForm.valid){
          console.log("Sucess")
        }
        else{
          console.log("invalid")
        }
          
        this.edit_student_info = false; // Exit editing mode
        this.edit_student_roll = null;  // Clear the flag
         
        }
    showDelete = false;

    showDeleteOption() {
      this.showDelete = true;
    }
      
    hideDeleteOption() {
      this.showDelete = false;
    }
    
    sortde:Student[]=[]
    
    
    sortData(col_Name:any,type:any){
      console.log(col_Name,type)
      
      if (col_Name=="roll_no"){
        if (type==true){
          if (this.search_input==true){
            this.filteredData=this.filteredData.sort((a,b)=>b.roll_no-a.roll_no)
          }
          else{
            this.student_details=this.student_details.sort((a,b)=>b.roll_no-a.roll_no)
            console.log("roll_no is clicked",type)
          }
        }
        else if (type==false){
          if (this.search_input==true){
            this.filteredData=this.filteredData.sort((a,b)=>a.roll_no-b.roll_no)
          }
          else{this.student_details=this.student_details.sort((a,b)=>a.roll_no-b.roll_no)
                console.log("roll_no is clicked",type)
              }
            }
      }
      if (col_Name=='name'){
        if (type==true){
          if (this.search_input==true){
            this.filteredData=this.filteredData.sort((a,b)=>b.name.localeCompare(a.name))
          }
          else{
          this.student_details=this.student_details.sort((a,b)=>b.name.localeCompare(a.name))
          console.log("name is clicked",type)
          }
        }
        else if (type==false){
          if (this.search_input==true){
            this.filteredData=this.filteredData.sort((a,b)=>a.name.localeCompare(b.name))
          }
          else{
          this.student_details=this.student_details.sort((a,b)=>a.name.localeCompare(b.name))
          console.log("name is clicked",type)
          }
        }
        }
      if (col_Name=='class'){
        if (type==true){
          if (this.search_input==true){
            this.filteredData=this.filteredData.sort((a,b)=>b.class-a.class)
          }
          else{
          this.student_details=this.student_details.sort((a,b)=>b.class-a.class)
          console.log("class is clicked",type)
        }
        }
        else if (type==false){
          if (this.search_input==true){
            this.filteredData=this.filteredData.sort((a,b)=>a.class-b.class)
          }
          this.student_details=this.student_details.sort((a,b)=>a.class-b.class)
          console.log("class is clicked",type)
        }
        }
      if (col_Name=='section'){
        if (type==true){
          if (this.search_input==true){
            this.filteredData=this.filteredData.sort((a,b)=>b.class-a.class)
          }
          else{
            this.student_details=this.student_details.sort((a,b)=>b.section.localeCompare(a.section))
            console.log("section is clicked",type)
          }
          
        }
        else if (type==false){
          if (this.search_input==true){
            this.filteredData=this.filteredData.sort((a,b)=>a.section.localeCompare(b.section))
          }
          this.student_details=this.student_details.sort((a,b)=>a.section.localeCompare(b.section))
          console.log("section is clicked",type)
        }
        }
      if (col_Name=='class_teacher'){
        if (type==true){
          if (this.search_input==true){
            this.filteredData=this.filteredData.sort((a,b)=>b.class_teacher.localeCompare(a.class_teacher))
          }
          else{
            this.student_details=this.student_details.sort((a,b)=>b.class_teacher.localeCompare(a.class_teacher))
            console.log("section is clicked",type)
          }
          
        }
        else if (type==false){
          if (this.search_input==true){
            this.student_details=this.student_details.sort((a,b)=>a.class_teacher.localeCompare(b.class_teacher))
            console.log("section is clicked",type)
          }

          
        }
        }
      if (col_Name=='age'){
        if (type==true){
          if (this.search_input==true){
            this.filteredData=this.filteredData.sort((a,b)=>b.age-(a.age))
          }
          else{
            this.student_details=this.student_details.sort((a,b)=>b.age-(a.age))
            console.log("section is clicked",type)
          }
          
        }
        else if (type==false){
          if (this.search_input==true){
            this.filteredData=this.filteredData.sort((a,b)=>a.age-(b.age))
          }
          else{
            this.student_details=this.student_details.sort((a,b)=>a.age-(b.age))
            console.log("section is clicked",type)
          }
          
        }
        }

    }
    descending=false
    sort_clicked(col_Name:string){
      this.descending=!this.descending
      console.log(this.descending)
      this.sortData(col_Name,this.descending)
    }
    

    
    clearSearch(){
      
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



    search=false
    searchText: string = '';
    filter(roll_no:number){
      console.log(roll_no)
    }
    // searchStudents(searchText:string){
    //   this.search=true
    //   // console.log(this.searchText)
    //   this.student_details=this.student_details.filter((value)=>
    //     value.name.toLowerCase().includes(searchText))
    // }

    // searchText: string = '';

  // handleSearchInput() {
  //   const words = this.searchText.split(' ');
  //   console.log('Entered words:', words);
  // }
  filteredData: Student[] = [];
  search_input=false
  lettersOnly(keyCode:any){
    const charCode=keyCode
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)  || charCode==32)

          return true;
    else
          return false;
  }
  numerical(txt:any){
    console.log(txt)
    if (this.search_input==true){
    this.filteredData = this.student_details.filter((item) =>
      item.name.toLowerCase().includes(txt.toLowerCase())
    );
  }
    console.log(this.student_details,"Student details")
    console.log(this.filteredData,"Filterd")
    
  }
  
  handleSearchInput(txt:any) {
    console.log(txt)
    if (this.search_input==true){
    this.filteredData = this.student_details.filter((item) =>
      item.name.toLowerCase().includes(txt.toLowerCase())
    );
  }
    console.log(this.student_details,"Student details")
    console.log(this.filteredData,"Filterd")
    
  }
  text_search=""
  handleKeyDown(event: KeyboardEvent) {
      console.log("key Pressed",event)
      this.search_input=true
      const key_code=event.keyCode
      if (key_code >= 48 && key_code <= 57){
        alert(true)
      }
      else{
      const isLetter=this.lettersOnly(key_code)
      
      if (isLetter==false){
        if (key_code==8){
        this.text_search=this.text_search.slice(0, -1)}
        }
        else {
          this.text_search+=event.key
        }
      console.log("key Pressed",this.text_search)
      this.handleSearchInput(this.text_search)
      }
      
  }


  p: number = 1; // Current page
  itemsPerPage: number = 6; // Items per page (you can adjust this)

  // ...

  // Method to set the current page
  setPage(page: number) {
    this.p = page;
  }
  
  
  
}
