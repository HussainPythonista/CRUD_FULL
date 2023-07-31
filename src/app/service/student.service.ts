import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://127.0.0.1:5500'; // Replace with your Flask API URL

  constructor(private http: HttpClient) { }

  // Fetch all students from the Flask API
  getAllStudents(): Observable<Student[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<Student[]>(url);
  }
}