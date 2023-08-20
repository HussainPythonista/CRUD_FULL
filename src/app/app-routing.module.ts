import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { EditStudentsComponent } from './edit-students/edit-students.component';
import { LoginComponent } from './login/LoginComponent';
import { StudentInfoComponent } from './student-info/student-info.component';

const newLocal = 'info';
const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'edit',component:EditStudentsComponent},
  {path:'add',component:EditStudentsComponent},
  {path: 'info', component:StudentInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }