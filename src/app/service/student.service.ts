import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Student } from '../models/student.model';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://127.0.0.1:5500'; // Replace with your Flask API URL
  public data_to_pass: any;

  public edit:boolean=false
  public edit_roll_no:number=0

  constructor(private http: HttpClient) {
  
   }



  check_present(roll_no:number){
    const url =`${this.apiUrl}//check_present/${roll_no}`
    return this.http.get<boolean>(url)
  } 

  // Fetch all students from the Flask API
  getAllStudents(): Observable<Student[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<Student[]>(url);
  }
  deleteOneStudent(roll_no:number):Observable<Student>{
    const url = `${this.apiUrl}/delete/${roll_no}`
    return this.http.delete<any>(url)
    
  }

  getOneStudent(roll_no:number):Observable<Student>{
    const url = `${this.apiUrl}/get_one/${roll_no}`
    return this.http.get<any>(url)
  }

  addStudent(studentData: Student): Observable<Student> {
    //studentData.roll_no = studentData.roll_no;
    return this.http.post<Student>(`${this.apiUrl}/add`, studentData);
  }

  stu_info_edit(data:any){
    this.edit=true
    this.data_to_pass=data
  }

  
  updateStudent ({ rollNo, data }: { rollNo: number; data: any; }):Observable<Student>{
      
  return this.http.put<Student>(`${this.apiUrl}/add`,data)
  }




}
