import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://127.0.0.1:5000'; // Replace with your Flask API URL

  constructor(private http: HttpClient) { }

  // Define methods to interact with the Flask API and fetch student data

  getAllStudents(): Observable<Student[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<Student[]>(url);
  }

  // Add more methods here to perform CRUD operations on student data if needed
}