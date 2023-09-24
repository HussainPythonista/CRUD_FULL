import { Component,OnInit,ChangeDetectorRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../service/student.service';
import {Student} from '../models/student.model'


@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit {
  
  search=false
  searchText: string = '';
  showDelete = false;
  added_message:string=""
  edit_student_info=false
  studentForm: FormGroup;
  filteredStudentDetails:Student[] = []
  info_pass_template:any;
  add_student:boolean=false
  edit_student_roll: number |null=null;
  student_details:Student[]=[]
  list_delete:any=[]
  isClicked:boolean=false
  isDeleteDisabled: boolean = false;
  isSelected=false
  descending=false
  filteredData: Student[] = [];
  search_input=false
  text_search=""

  constructor(
    private formBuilder: FormBuilder,
    private studentService:StudentService,
    private changeDetector: ChangeDetectorRef)
    {
      
    this.studentForm = this.formBuilder.group({
      roll_no: ['', Validators.required],
      name: ['', Validators.required],
      age: ['', Validators.required],
      class: ['', Validators.required],
      section: ['', Validators.required],
      class_teacher: ['', Validators.required]
    });
        
  }
    
    reassign(){
      
        console.log(this.added_message)
        setTimeout(() => {
        this.added_message = "";
        console.log(this.added_message);
        }, 3000);
      }
    
    ngOnInit(){
      
      this.get_student()
      
    }
    filterStudentDetails(searchText: string|number) {
      if (Number( searchText)){
        console.log("Number")
      }
      // searchText = searchText.toLowerCase();
      // this.filteredStudentDetails = this.student_details.filter(
      //   student => 
      //     student.roll_no.toString().includes(searchText) ||
      //     student.name.toLowerCase().includes(searchText)
      // );
      
    }
    
  
    add_new_info(){
      this.added_message="Information Added"
      console.log("Added Information",this.studentForm.value)
      this.reassign()
      
    }
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
      this.reassign()
      this.studentService.deleteOneStudent(roll_no).subscribe(
        (response)=>{
          this.added_message="Information Deleted"
          console.log(response)
          this.get_student()
          this.reassign()
        }
      )
      
    }
    reset_add_info(){
      this.resetForm()
      if (this.edit_student_info==false){
        this.add_student=!this.add_student
      }
      
      else{
        this.cancel_edit()
        this.reset_add_info()
      } 
    }
    add_student_info(){
      this.reset_add_info()
      console.log(this.studentForm.value)

    }
    
    get_student(){
      this.studentService.getAllStudents().subscribe(
        (data:Student[])=>{
          this.student_details= data.sort((a,b)=>a.roll_no-b.roll_no)
          
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
      else if(this.add_student==true){
        if (this.studentForm.valid){
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
        this.studentForm.reset();}
    

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
    
    save_edit(){
          console.log("save_edit!!!",this.studentForm.value)
          
          if (this.studentForm.valid){
            const formData = this.studentForm.value ;
            // console.log(formData);
            console.log(formData)
            this.studentService.addStudent(formData).subscribe(
              (response)=>{
                this.get_student()
                this.resetForm()
                console.log(response)})
            }
          
          else{
            console.log("invalid")
          }
            
          this.edit_student_info = false; // Exit editing mode
          this.edit_student_roll = null;  // Clear the flag
        }
    

    showDeleteOption() {
      this.showDelete = true;
    }
      
    hideDeleteOption() {
      this.showDelete = false;
    }
    
    
    sortData(colName: string, ascending: boolean) {
      `The sortData function is responsible for sorting student data based on a specified column and sorting order 
      (ascending or descending). It takes two parameters: colName,which represents the name of the column to sort by,
      and ascending, a boolean indicating the sorting order.`

      console.log(colName, ascending);
    
      // Define a comparator function based on column name
      const comparator = (a:any, b:any) => {
        switch (colName) {
          case 'roll_no':
            return ascending ? a.roll_no - b.roll_no : b.roll_no - a.roll_no;
          case 'name':
            return ascending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
          case 'class':
            return ascending ? a.class - b.class : b.class - a.class;
          case 'section':
            return ascending ? a.section.localeCompare(b.section) : b.section.localeCompare(a.section);
          case 'class_teacher':
            return ascending ? a.class_teacher.localeCompare(b.class_teacher) : b.class_teacher.localeCompare(a.class_teacher);
          case 'age':
            return ascending ? a.age - b.age : b.age - a.age;
          default:
            return 0; // Default to no change in sorting order
          }
        };
    
        if (this.search_input) {
          // If search input is enabled, sort filtered data
          this.filteredData = this.filteredData.sort(comparator);
        } else {
          // Otherwise, sort the main data
          this.student_details = this.student_details.sort(comparator);
        }
      
        console.log(`${colName} is clicked`, ascending);
    }
    
    sort_clicked(col_Name:string){
      this.descending=!this.descending
      console.log(this.descending)
      this.sortData(col_Name,this.descending)
    }


    
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
    
    filter(roll_no:number){
      console.log(roll_no)
    }
    searchStudents(searchText:string){
      this.search=true
      // console.log(this.searchText)
      this.student_details=this.student_details.filter((value)=>
        value.name.toLowerCase().includes(searchText))
    }

  lettersOnly(keyCode:any){
    `The lettersOnly function checks whether a given key code corresponds to a letter character 
    (A-Z or a-z) or a space character. It returns true if the key code represents a letter or 
    space and false otherwise.`
    const charCode=keyCode

    // if (charCode >= 48 && charCode <= 57) {
    //   alert('input was 0-9');
    // }

    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)  || charCode==32)

          return true;
    else
          return false;
  }
  
  numerical(txt:any){
    console.log(txt)
    if (this.search_input==true){
    this.filteredData = this.student_details.filter((item) =>
      item.roll_no.toString().includes(txt)
    );
    }
  }

  handleSearchInput(txt: any) {
    `The handleSearchInput function is responsible for handling user input for searching student data. 
    It takes a txt parameter, which represents the text query entered by the user.`
  // Log the provided text query to the console for debugging purposes.
  console.log(txt);

  // Check if the search input is enabled (true).
  if (this.search_input == true) {
    // Use the Array.filter() method to create a new array containing student
    // details that include the provided text query (case-insensitive).
    this.filteredData = this.student_details.filter(item =>
      item.name.toLowerCase().includes(txt.toLowerCase())
    );
  }

  // Log the original student details and the filtered data arrays for further debugging.
  // console.log(this.student_details, "Student details");
  // console.log(this.filteredData, "Filtered");
}

  


  name_search(key_code:any,event:any){
    const isLetter=this.lettersOnly(key_code)
      
      if (isLetter==false){
        if (key_code==8){
        this.text_search=this.text_search.slice(0, -1)}
        }
        else {
          this.text_search+=event.key
        }
      //console.log("key Pressed",this.text_search)
      this.handleSearchInput(this.text_search)
      
  }
  handleKeyDown(event: KeyboardEvent) {
    
    `The handleKeyDown function is responsible for handling keyboard events, 
     logging key presses, dynamically updating a search input field while filtering 
     out non-letter characters, and initiating a search based on the input text.`

    //  isNaN(event.)
    //console.log("Key Pressed", this.text_search);
    console.log("Key Pressed", event.key);
    this.search_input = true;
    const key_code = event.keyCode;
    
    // Check if the key is a letter character or a space using the lettersOnly function.
    const isLetter = this.lettersOnly(key_code);
  
    if (key_code >= 48 && key_code <= 57){
      this.text_search+=event.key
      this.numerical(this.text_search)
    }
    else{
      this.name_search(key_code,event)
    }
}
  
    // console.log("Key Pressed", this.text_search);
  
    // Trigger a search with the updated input.
    // this.handleSearchInput(this.text_search);
  
    p: number = 1; // Current page
  itemsPerPage: number = 6; // Items per page (you can adjust this)

  // ...

  // Method to set the current page
  setPage(page: number) {
    this.p = page;
  }
  
}

