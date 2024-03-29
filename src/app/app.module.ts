import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StudentListComponent } from './student-list/student-list.component';
import { EditStudentsComponent } from './edit-students/edit-students.component'
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/LoginComponent';
import { StudentInfoComponent } from './student-info/student-info.component';
import { TestComponent } from './test/test.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationComponent } from './pagination/pagination.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { StudentListComponent } from './student-list/student-list.component';
//import { StudentFormComponent } from './student-form/student-form.component';

@NgModule({
  declarations: [AppComponent, StudentListComponent,EditStudentsComponent, LoginComponent, StudentInfoComponent, TestComponent, PaginationComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule,BrowserModule,
    AppRoutingModule, // Make sure your AppRoutingModule or equivalent is imported here
    RouterModule,NgxPaginationModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
